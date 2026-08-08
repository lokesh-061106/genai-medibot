from sqlalchemy import Column, Integer, String, Text
from backend.database import Base

class EmbeddingsMetadata(Base):
    __tablename__ = "embeddings_metadata"
    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String, nullable=False, index=True)
    source_id = Column(String, nullable=False, index=True)
    chunk_text = Column(Text, nullable=False)
    vector_id = Column(String, nullable=False, index=True)
