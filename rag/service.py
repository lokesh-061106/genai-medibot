import os
from typing import List
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from pypdf import PdfReader

from rag.prompt import medical_prompt_template

# Load environment variables (e.g. GROQ_API_KEY)
load_dotenv()

class MedicalRAGService:
    def __init__(self, persist_directory: str = "chroma_db"):
        self.persist_directory = persist_directory
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.llm = ChatGroq(model_name="llama3-8b-8192", temperature=0)
        self.vectorstore = Chroma(
            collection_name="medical_docs",
            embedding_function=self.embeddings,
            persist_directory=self.persist_directory
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
        # The qa_chain will retrieve documents and pass them to the LLM with the strict prompt
        return self.qa_chain.invoke(question)

# Singleton instance
rag_service = MedicalRAGService()
