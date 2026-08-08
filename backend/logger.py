import logging
import sys

def setup_logging():
    """
    Configures centralized JSON or standard logging for the application.
    """
    logging.basicConfig(
        stream=sys.stdout,
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )
    logger = logging.getLogger("medibot")
    logger.info("Logging configured.")
    return logger

logger = setup_logging()
