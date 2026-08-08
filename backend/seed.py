import os
import sys

# Ensure backend can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from datetime import date, datetime, timedelta
import random
from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine, Base
from authentication.models import User, UserRole
from patient.models import Patient, Vitals, MedicalHistory, Medication, HistoryStatus, Gender
from backend.models import Hospital, Appointment, AppointmentStatus, Report, ReportType
from doctor.models import Doctor
from government.models import GovernmentScheme, PatientScheme
from authentication.security import get_password_hash

def seed_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if seeded
        if db.query(User).filter(User.email == "patient@test.com").first():
            print("Database already seeded.")
            return

        print("Seeding database...")
        # Users
        patient_user = User(
            email="patient@test.com",
            hashed_password=get_password_hash("password123"),
            role=UserRole.PATIENT,
            is_active=True,
            is_verified=True
        )
        doctor_user = User(
            email="doctor@test.com",
            hashed_password=get_password_hash("password123"),
            role=UserRole.DOCTOR,
            is_active=True,
            is_verified=True
        )
        db.add_all([patient_user, doctor_user])
        db.commit()

        # Profiles
        patient_profile = Patient(
            user_id=patient_user.id,
            first_name="Jane",
            last_name="Doe",
            dob=date(1990, 5, 15),
            gender=Gender.FEMALE,
            blood_type="O+",
            phone="555-0101"
        )
        db.add(patient_profile)
        db.commit()

        hospital = Hospital(name="City General", address="123 Health Way", registry_number="HOSP-100")
        db.add(hospital)
        db.commit()

        doctor_profile = Doctor(
            user_id=doctor_user.id,
            hospital_id=hospital.id,
            first_name="Alice",
            last_name="Smith",
            specialization="Cardiology",
            license_number="LIC-8991"
        )
        db.add(doctor_profile)
        db.commit()

        # Medical History
        hist1 = MedicalHistory(
            patient_id=patient_user.id,
            condition="Hypertension",
            diagnosed_at=date(2021, 6, 10),
            status=HistoryStatus.ACTIVE
        )
        hist2 = MedicalHistory(
            patient_id=patient_user.id,
            condition="Type 2 Diabetes",
            diagnosed_at=date(2023, 1, 15),
            status=HistoryStatus.ACTIVE
        )
        db.add_all([hist1, hist2])

        # Medications
        med1 = Medication(
            patient_id=patient_user.id,
            prescribed_by=doctor_user.id,
            name="Lisinopril",
            dosage="10mg",
            frequency="Once daily",
            start_date=date(2021, 6, 12)
        )
        med2 = Medication(
            patient_id=patient_user.id,
            prescribed_by=doctor_user.id,
            name="Metformin",
            dosage="500mg",
            frequency="Twice daily",
            start_date=date(2023, 1, 20)
        )
        db.add_all([med1, med2])

        # Appointments
        appt1 = Appointment(
            patient_id=patient_user.id,
            doctor_id=doctor_user.id,
            hospital_id=hospital.id,
            scheduled_at=datetime.now() + timedelta(days=2),
            status=AppointmentStatus.SCHEDULED,
            notes="Routine checkup"
        )
        appt2 = Appointment(
            patient_id=patient_user.id,
            doctor_id=doctor_user.id,
            hospital_id=hospital.id,
            scheduled_at=datetime.now() - timedelta(days=30),
            status=AppointmentStatus.COMPLETED,
            notes="Blood pressure elevated"
        )
        db.add_all([appt1, appt2])

        # Vitals (TimeSeries)
        vitals = []
        base_time = datetime.now() - timedelta(days=30)
        for i in range(10):
            sys = random.randint(120, 145)
            dia = random.randint(80, 95)
            hr = random.randint(65, 85)
            temp = round(random.uniform(36.5, 37.2), 1)
            v = Vitals(
                patient_id=patient_user.id,
                recorded_at=base_time + timedelta(days=i*3),
                heart_rate=hr,
                blood_pressure_systolic=sys,
                blood_pressure_diastolic=dia,
                temperature=temp,
                weight=70.5
            )
            vitals.append(v)
        db.add_all(vitals)

        # Govt Schemes
        scheme1 = GovernmentScheme(name="National Health Coverage", description="Free basic healthcare for citizens", eligibility_criteria="All citizens")
        db.add(scheme1)
        db.commit()

        ps1 = PatientScheme(patient_id=patient_user.id, scheme_id=scheme1.id)
        db.add(ps1)

        db.commit()
        print("Database seeded successfully.")

    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
