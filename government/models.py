from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from backend.database import Base

class GovernmentScheme(Base):
    __tablename__ = "government_schemes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text)
    eligibility_criteria = Column(Text)

class PatientScheme(Base):
    __tablename__ = "patient_schemes"
    patient_id = Column(Integer, ForeignKey("patients.user_id", ondelete="CASCADE"), primary_key=True)
    scheme_id = Column(Integer, ForeignKey("government_schemes.id", ondelete="CASCADE"), primary_key=True)
    enrolled_at = Column(DateTime(timezone=True), server_default=func.now())
