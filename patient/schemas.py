from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    dob: date
    gender: str
    blood_type: Optional[str] = None
    phone: Optional[str] = None

class PatientResponse(PatientBase):
    user_id: int
    class Config:
        from_attributes = True

class VitalBase(BaseModel):
    recorded_at: datetime
    heart_rate: Optional[int] = None
    blood_pressure_systolic: Optional[int] = None
    blood_pressure_diastolic: Optional[int] = None
    temperature: Optional[float] = None
    weight: Optional[float] = None

class VitalResponse(VitalBase):
    id: int
    class Config:
        from_attributes = True

class DashboardData(BaseModel):
    health_score: int
    insights: List[str]
    vitals: List[VitalResponse]
    upcoming_appointments: List[dict]
    active_medications: List[dict]
    medical_history: List[dict]
    government_schemes: List[dict]
