import os
import json
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY")
)

prompt = PromptTemplate(
    input_variables=["content"],
    template="""
Return ONLY JSON.
NO text. NO markdown.

Format:
[
  {{
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
    "explanation": "short explanation",
    "difficulty": "easy | medium | hard",
    "related_topics": ["topic1", "topic2", "topic3"]
  }}
]

Text:
{content}
"""
)

def generate_quiz(article_text: str) -> list:
    response = llm.invoke(
        prompt.format(content=article_text[:3000])
    )
    raw = response.content
    start = raw.find("[")
    end = raw.rfind("]") + 1
    if start == -1 or end == -1:
        raise ValueError("No JSON array returned by LLM")

    parsed = json.loads(raw[start:end])


    return parsed  


