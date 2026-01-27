import { useState } from "react";
import GenerateQuiz from "./pages/GenerateQuiz";
import History from "./pages/History";
import api from "./services/api";

function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("generate");
  const [loadedQuiz, setLoadedQuiz] = useState(null);

  const openFromHistory = async (id) => {
    const res = await api.get(`/api/history/${id}`);
    setLoadedQuiz(res.data);
    setPage("generate");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900
                      text-black dark:text-white p-6">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">
              🧠 AI Wiki Quiz Generator
            </h1>

            <button
              onClick={() => setDark(!dark)}
              className="ml-auto px-4 py-2 rounded
                         bg-gray-200 dark:bg-gray-700"
            >
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPage("generate")}
              className={`px-5 py-2 rounded-full
                ${page === "generate"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"}`}
            >
              Generate Quiz
            </button>

            <button
              onClick={() => setPage("history")}
              className={`px-5 py-2 rounded-full
                ${page === "history"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"}`}
            >
              History
            </button>
          </div>

          {/* CONTENT */}
          {page === "generate" ? (
            <GenerateQuiz presetQuiz={loadedQuiz} />
          ) : (
            <History onOpenQuiz={openFromHistory} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
