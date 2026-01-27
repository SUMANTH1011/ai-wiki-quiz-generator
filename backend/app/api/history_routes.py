from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.quiz import Quiz, Question
router = APIRouter(prefix="/api/history", tags=["History"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.get("/")
def get_quiz_history(db: Session = Depends(get_db)):
    quizzes = db.query(Quiz).order_by(Quiz.created_at.desc()).all()

    return [
        {
            "id": q.id,
            "url": q.url,
            "title": q.title,
            "created_at": q.created_at
        }
        for q in quizzes
    ]
@router.get("/{quiz_id}")
def get_quiz_details(quiz_id: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()

    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions = db.query(Question).filter(Question.quiz_id == quiz.id).all()

    return {
        "id": quiz.id,
        "url": quiz.url,
        "title": quiz.title,
        "summary": quiz.summary,
        "quiz": [
            {
                "question": q.question,
                "options": q.options,
                "answer": q.answer,
                "difficulty": q.difficulty,
                "explanation": q.explanation
            }
            for q in questions
        ]
    }
