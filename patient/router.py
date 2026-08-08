from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from authentication.dependencies import get_current_user
from authentication.models import User
from patient.models import Patient, Vitals, MedicalHistory, Medication
from backend.models import Appointment, Hospital
from government.models import PatientScheme, GovernmentScheme
from .schemas import DashboardData, VitalResponse

router = APIRouter(prefix="/patient", tags=["patient"])

@router.get("/dashboard", response_model=DashboardData)
def get_patient_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fetch Vitals
    vitals = db.query(Vitals).filter(Vitals.patient_id == current_user.id).order_by(Vitals.recorded_at.asc()).all()
    
    # Fetch Appointments
    appointments = db.query(Appointment, Hospital).join(Hospital, Appointment.hospital_id == Hospital.id)\
        .filter(Appointment.patient_id == current_user.id).all()
    
    appt_list = [
        {
            "id": a.Appointment.id,
            "scheduled_at": a.Appointment.scheduled_at,
            "status": a.Appointment.status,
            "hospital_name": a.Hospital.name
        } for a in appointments
    ]
    
    # Fetch Medications
    medications = db.query(Medication).filter(Medication.patient_id == current_user.id).all()
    med_list = [
        {
            "name": m.name,
            "dosage": m.dosage,
            "frequency": m.frequency
        } for m in medications
    ]
    
    # Fetch History
    history = db.query(MedicalHistory).filter(MedicalHistory.patient_id == current_user.id).all()
    hist_list = [
        {
            "condition": h.condition,
            "diagnosed_at": h.diagnosed_at,
            "status": h.status
        } for h in history
    ]

    # Govt Schemes
    schemes = db.query(GovernmentScheme).join(PatientScheme, GovernmentScheme.id == PatientScheme.scheme_id)\
        .filter(PatientScheme.patient_id == current_user.id).all()
    scheme_list = [
        {
            "name": s.name,
            "description": s.description
        } for s in schemes
    ]

    # Calculate Health Score based on actual data
    score = 100
    if len(hist_list) > 0:
        score -= len(hist_list) * 5
    if len(vitals) > 0:
        latest = vitals[-1]
        if latest.blood_pressure_systolic and latest.blood_pressure_systolic > 130:
            score -= 10

    # Insights
    insights = []
    if score >= 90:
        insights.append("Your health score is excellent.")
    elif score >= 70:
        insights.append("Your health is stable, but there is room for improvement.")
    else:
        insights.append("Attention needed. Please follow up on your active conditions.")

    if len(med_list) > 0:
        insights.append(f"You are actively taking {len(med_list)} medications.")
    
    if len(appt_list) > 0:
        insights.append(f"You have {len(appt_list)} upcoming appointments.")

    return DashboardData(
        health_score=score,
        insights=insights,
        vitals=[VitalResponse.model_validate(v) for v in vitals],
        upcoming_appointments=appt_list,
        active_medications=med_list,
        medical_history=hist_list,
        government_schemes=scheme_list
    )
