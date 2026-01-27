import { useEffect, useState } from "react";
import api from "../services/api";
import QuizModal from "../components/QuizModal";

function History() {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    api.get("/api/history/").then((res) => {
      setHistory(res.data);
    });
  }, []);

  const openDetails = async (id) => {
    const res = await api.get(`/api/history/${id}`);
    setSelectedQuiz(res.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Past Quizzes</h2>

      <table className="w-full border">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((q) => (
            <tr key={q.id}>
              <td className="p-2 border">{q.id}</td>
              <td className="p-2 border">{q.title}</td>
              <td className="p-2 border text-sm truncate max-w-xs">{q.url}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm"
                  onClick={() => openDetails(q.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuiz && (
        <QuizModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}
    </div>
  );
}

export default History;
