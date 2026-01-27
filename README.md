# 🧠 AI Wiki Quiz Generator

Generate quizzes instantly from Wikipedia articles using AI.
The system scrapes Wikipedia content, generates structured quizzes using an LLM, stores results in a database, and provides an interactive quiz-taking experience.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- LangChain
- Groq LLM (Free Tier)

### Database
- PostgreSQL (Render)
- SQLite (Local development)

### Deployment
- Frontend: Vercel / Netlify
- Backend: Render

---

## ✨ Features

### Core Features
- Generate quiz from Wikipedia URL (HTML scraping only)
- 5–10 AI-generated MCQs per article
- Each question includes:
  - Question text
  - Four options (Roman numerals I–IV)
  - Correct answer
  - Explanation
  - Difficulty level
- Related Wikipedia topics for further reading
- Persistent quiz storage (PostgreSQL)
- History view with full quiz details

### Bonus Features
- 📝 Take Quiz mode with scoring
- 🔁 Caching to avoid duplicate scraping
- 🔍 URL validation & article title preview
- 📦 Export quiz as JSON
- 🖨 Print-friendly quiz view
- 🌙 Dark mode
- 🎨 Animated & card-based UI

---

## 📂 Project Structure

ai-wiki-quiz-gen/
│
├── backend/
│ ├── app/
│ │ ├── core/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ └── main.py
│ ├── requirements.txt
│ └── README.md
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── package.json
│
└── sample_data/
├── alan_turing.json
└── albert_einstein.json


---

## ⚙️ How to Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at: http://127.0.0.1:8000
Swagger docs: http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install
npm run dev

Frontend runs at: http://localhost:5173

📄 License

MIT


---

# 🌐 DEPLOYMENT (QUICK GUIDE)

## Backend → Render
1. Push backend to GitHub
2. Render → New Web Service
3. Build command:
```bash
pip install -r requirements.txt


Start command:

uvicorn app.main:app --host 0.0.0.0 --port 10000


Add env variable:

GROQ_API_KEY=your_key