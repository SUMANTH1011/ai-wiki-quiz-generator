import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import TakeQuiz from "../components/TakeQuiz";

const roman = ["I", "II", "III", "IV"];
function GenerateQuiz({ presetQuiz }) {
  const [url, setUrl] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("take");
  useEffect(() => {
    if (presetQuiz) {
      setQuizData(presetQuiz);
      setMode("view");
    }
  }, [presetQuiz]);

  const handleGenerate = async () => {
    if (!url) {
      alert("Please enter a Wikipedia URL");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/quiz/generate", null, {
        params: { url },
      });

      let data;
      if (res.data.message === "Quiz already exists") {
        const details = await api.get(`/api/history/${res.data.id}`);
        data = details.data;
      } else {
        data = res.data;
      }

      setQuizData(data);
      setMode("take");
    } catch (err) {
      alert(err.response?.data?.detail || "Error generating quiz");
    } finally {
      setLoading(false);
    }
  };
const MotionDiv = motion?.div || "div";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Generate Quiz</h2>

      {/* INPUT */}
      <div className="bg-white dark:bg-gray-800 p-6 mb-6 rounded-2xl shadow">
        <input
          type="text"
          placeholder="Paste Wikipedia URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-4 border rounded-xl mb-4
                     dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white
                     px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? "⏳ Generating..."
            : quizData
              ? "🔄 Generate Again"
              : "⚡ Generate Quiz"}
        </button>
      </div>

      {/* MODE SWITCH */}
      {quizData && (
        <div className="flex gap-3 mb-6 sticky top-4 z-10">
          {["take", "view"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-2 rounded-full font-medium
                ${
                  mode === m
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
              {m === "take" ? "Take Quiz" : "View Quiz"}
            </button>
          ))}
        </div>
      )}

      {/* QUIZ */}
      {quizData && (
        <>
          {mode === "take" ? (
            <TakeQuiz quiz={quizData.quiz} />
          ) : (
            <>
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">{quizData.title}</h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-200
                               dark:bg-gray-700 rounded"
                  >
                    🖨 Print
                  </button>
                </div>
              </div>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {quizData.summary}
              </p>

              {/* QUESTIONS */}
              <MotionDiv
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
                {quizData.quiz.map((q, index) => (
                  <motion.div
                    key={`${q.question}-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 25 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="bg-white dark:bg-gray-800
                               p-6 mb-6 rounded-2xl shadow"
                  >
                    {/* DIFFICULTY */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium
                        ${
                          q.difficulty === "easy"
                            ? "bg-green-100 text-green-700"
                            : q.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                    >
                      {q.difficulty}
                    </span>

                    {/* QUESTION */}
                    <h4 className="text-lg font-semibold mt-4 mb-4">
                      {index + 1}. {q.question}
                    </h4>

                    {/* OPTIONS */}
                    <ul className="space-y-2">
                      {Object.values(q.options).map((opt, i) => (
                        <li
                          key={i}
                          className={`flex gap-2 p-3 rounded transition
                         ${
                           opt === q.answer
                             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold"
                             : "dark:text-gray-300"
                         }`}
                        >
                          <strong>{roman[i]}.</strong> {opt}
                        </li>
                      ))}
                    </ul>

                    {/* ANSWER */}
                    <p className="mt-3 font-semibold text-green-700 dark:text-green-300">
                      ✔ Answer: {q.answer}
                    </p>

                    {/* EXPLANATION */}
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                      💡 {q.explanation}
                    </p>
                  </motion.div>
                ))}
              </MotionDiv>

              {/* RELATED TOPICS */}
              {quizData.related_topics &&
                quizData.related_topics.length > 0 && (
                  <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h4 className="text-lg font-semibold mb-3">
                      📚 Related Wikipedia Topics
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {quizData.related_topics.map((topic, i) => (
                        <a
                          key={i}
                          href={`https://en.wikipedia.org/wiki/${topic.replace(
                            " ",
                            "_",
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-full text-sm
                                     bg-blue-100 text-blue-700
                                     hover:bg-blue-200 transition"
                        >
                          {topic}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default GenerateQuiz;
