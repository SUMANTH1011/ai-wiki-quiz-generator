from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.models import quiz
from app.api.quiz_routes import router as quiz_router
from app.api.history_routes import router as history_router

app = FastAPI(
    title="AI Wiki Quiz Generator"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-wiki-quiz-generator-sage.vercel.app",
        "https://ai-wiki-quiz-generator.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

quiz.Base.metadata.create_all(bind=engine)

app.include_router(quiz_router)
app.include_router(history_router)

@app.get("/")
def health_check():
    return {"status": "Database connected 🚀"}
