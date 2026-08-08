from sqlalchemy import Column, Integer, String, ForeignKey
from backend.database import Base

class Doctor(Base):
    __tablename__ = "doctors"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id", ondelete="SET NULL"), index=True, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    license_number = Column(String, unique=True, index=True, nullable=False)
