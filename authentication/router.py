from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from backend.database import get_db
from authentication import models, schemas, security, utils
from authentication.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = security.get_password_hash(user_in.password)
    new_user = models.User(
        email=user_in.email,
        hashed_password=hashed_password,
        role=user_in.role,
        is_verified=False
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    otp_code = utils.generate_otp()
    otp_entry = models.OTP(
        user_id=new_user.id,
        otp_code=otp_code,
        purpose="verification",
        expires_at=datetime.utcnow() + timedelta(minutes=15)
    )
    db.add(otp_entry)
    db.commit()
    
    utils.send_mock_email(
        to_email=new_user.email,
        subject="Verify your MediBot Account",
        body=f"Your verification code is: {otp_code}"
    )
    
    return {"message": "User registered successfully. Please verify your email."}

@router.post("/verify-email")
def verify_email(payload: schemas.VerifyEmailRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    otp = db.query(models.OTP).filter(
        models.OTP.user_id == user.id,
        models.OTP.purpose == "verification",
        models.OTP.otp_code == payload.otp_code
    ).first()
    
    if not otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    if otp.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")
        
    user.is_verified = True
    db.delete(otp)
    db.commit()
    
    return {"message": "Email verified successfully."}

@router.post("/login")
def login(response: Response, payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not security.verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
        
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")
        
    access_token = security.create_access_token(data={"sub": str(user.id)})
    refresh_token = security.create_refresh_token(data={"sub": str(user.id)})
    
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=15 * 60
    )
    
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7 * 24 * 60 * 60
    )
    
    return {"message": "Logged in successfully"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

@router.post("/forgot-password")
def forgot_password(payload: schemas.ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if user:
        otp_code = utils.generate_otp()
        otp_entry = models.OTP(
            user_id=user.id,
            otp_code=otp_code,
            purpose="reset_password",
            expires_at=datetime.utcnow() + timedelta(minutes=15)
        )
        db.add(otp_entry)
        db.commit()
        
        utils.send_mock_email(
            to_email=user.email,
            subject="Reset your MediBot Password",
            body=f"Your password reset code is: {otp_code}"
        )
        
    return {"message": "If that email is registered, a reset code has been sent."}

@router.post("/reset-password")
def reset_password(payload: schemas.ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    otp = db.query(models.OTP).filter(
        models.OTP.user_id == user.id,
        models.OTP.purpose == "reset_password",
        models.OTP.otp_code == payload.otp_code
    ).first()
    
    if not otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
        
    if otp.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")
        
    user.hashed_password = security.get_password_hash(payload.new_password)
    db.delete(otp)
    db.commit()
    
    return {"message": "Password reset successfully."}

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user
