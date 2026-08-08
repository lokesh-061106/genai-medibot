import os
from typing import List
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from pypdf import PdfReader
from pinecone import Pinecone

from rag.prompt import medical_prompt_template

# Load environment variables
load_dotenv()

class MedicalRAGService:
    def __init__(self):
        # We use the Inference API so it doesn't download weights locally (required for Vercel)
        self.embeddings = HuggingFaceEndpointEmbeddings(
            model="sentence-transformers/all-MiniLM-L6-v2",
            huggingfacehub_api_token=os.environ.get("HF_TOKEN")
        )
        self.llm = ChatGroq(model_name="llama3-8b-8192", temperature=0)
        
        # Initialize Pinecone
        index_name = os.environ.get("PINECONE_INDEX_NAME", "medibot")
        self.vectorstore = PineconeVectorStore(
            index_name=index_name,
            embedding=self.embeddings,
            pinecone_api_key=os.environ.get("PINECONE_API_KEY")
        )
        self.retriever = self.vectorstore.as_retriever(search_kwargs={"k": 4})
        
        self.qa_chain = (
            {"context": self.retriever | self._format_docs, "question": RunnablePassthrough()}
            | medical_prompt_template
            | self.llm
            | StrOutputParser()
        )

    def _format_docs(self, docs):
        return "\n\n".join(doc.page_content for doc in docs)

    def ingest_pdf(self, file_path: str):
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
        )
        chunks = text_splitter.split_text(text)
        
        documents = [Document(page_content=chunk, metadata={"source": file_path}) for chunk in chunks]
        self.vectorstore.add_documents(documents)
        return len(documents)
        
    def ingest_text(self, text: str, source: str = "manual"):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
        )
        chunks = text_splitter.split_text(text)
        documents = [Document(page_content=chunk, metadata={"source": source}) for chunk in chunks]
        self.vectorstore.add_documents(documents)
        return len(documents)

    def query(self, question: str) -> str:
        return self.qa_chain.invoke(question)

# Singleton instance (Lazy initialized to prevent Vercel build crashes without API keys)
_rag_service = None

def get_rag_service():
    global _rag_service
    if _rag_service is None:
        _rag_service = MedicalRAGService()
    return _rag_service
