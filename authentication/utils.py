import random
import string
from backend.logger import logger

def generate_otp(length=6):
    return "".join(random.choices(string.digits, k=length))

def send_mock_email(to_email: str, subject: str, body: str):
    """
    Mocks sending an email by logging to the console.
    """
    logger.info("--- MOCK EMAIL ---")
    logger.info(f"To: {to_email}")
    logger.info(f"Subject: {subject}")
    logger.info(f"Body: {body}")
    logger.info("------------------")
