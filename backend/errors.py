from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from backend.logger import logger
from pydantic import BaseModel
from typing import Optional

class ProblemDetails(BaseModel):
    """RFC 7807 Problem Details for HTTP APIs"""
    type: str = "about:blank"
    title: str
    status: int
    detail: str
    instance: Optional[str] = None

async def problem_details_handler(request: Request, exc: Exception) -> JSONResponse:
    problem = ProblemDetails(
        type="about:blank",
        title="Internal Server Error",
        status=500,
        detail=str(exc),
        instance=str(request.url)
    )
    return JSONResponse(status_code=500, content=problem.model_dump())

def setup_exception_handlers(app):
    app.add_exception_handler(Exception, problem_details_handler)
