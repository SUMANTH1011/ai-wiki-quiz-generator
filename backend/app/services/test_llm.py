from app.services.scraper import scrape_wikipedia
from app.services.quiz_generator import generate_quiz

data = scrape_wikipedia("https://en.wikipedia.org/wiki/Alan_Turing")

print("Clean text length:", len(data["clean_text"]))
print(data["clean_text"][:300])  # preview

quiz_json = generate_quiz(data["clean_text"])
print(quiz_json)
