from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.scraper import scrape_wikipedia
from app.services.quiz_generator import generate_quiz
from app.models.quiz import Quiz, Question

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/generate")
def generate_quiz_from_url(url: str, db: Session = Depends(get_db)):
    try:
        scraped = scrape_wikipedia(url)

        quiz_list = generate_quiz(scraped["clean_text"])

        quiz = Quiz(
            url=url,
            title=scraped["title"],
            summary=scraped["summary"]
        )
        db.add(quiz)
        db.commit()
        db.refresh(quiz)

        for q in quiz_list:
            db.add(
                Question(
                    quiz_id=quiz.id,
                    question=q["question"],
                    options=q["options"],
                    answer=q["answer"],
                    difficulty="medium",
                    explanation=""
                )
            )

        db.commit()

        return {
            "id": quiz.id,
            "url": quiz.url,
            "title": quiz.title,
            "summary": quiz.summary,
            "quiz": quiz_list
        }

    except Exception as e:
        print("❌ BACKEND ERROR:", repr(e))
        raise HTTPException(status_code=400, detail=str(e))
