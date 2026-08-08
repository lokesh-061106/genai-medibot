from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Text, Float, DateTime
from sqlalchemy.sql import func
from backend.database import Base
import enum

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class HistoryStatus(str, enum.Enum):
    ACTIVE = "active"
    RESOLVED = "resolved"

class Patient(Base):
    __tablename__ = "patients"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    gender = Column(Enum(Gender), nullable=False)
    blood_type = Column(String)
    phone = Column(String)

class MedicalHistory(Base):
    __tablename__ = "medical_history"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.user_id", ondelete="CASCADE"), index=True, nullable=False)
    condition = Column(String, nullable=False)
    diagnosed_at = Column(Date)
    status = Column(Enum(HistoryStatus), default=HistoryStatus.ACTIVE)
    notes = Column(Text)

class Medication(Base):
    __tablename__ = "medication"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.user_id", ondelete="CASCADE"), index=True, nullable=False)
    prescribed_by = Column(Integer, ForeignKey("doctors.user_id", ondelete="SET NULL"), index=True, nullable=True)
    name = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    frequency = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)

class Vitals(Base):
    __tablename__ = "vitals"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.user_id", ondelete="CASCADE"), index=True, nullable=False)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    heart_rate = Column(Integer) # bpm
    blood_pressure_systolic = Column(Integer)
    blood_pressure_diastolic = Column(Integer)
    temperature = Column(Float) # Celsius
    weight = Column(Float) # kg

