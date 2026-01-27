function QuizModal({ quiz, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 max-w-3xl w-full rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">{quiz.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="mb-4 text-gray-700">{quiz.summary}</p>

        {quiz.quiz.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p className="font-semibold">
              {index + 1}. {q.question}
            </p>
            <ul className="ml-4 mt-2">
              {q.options.map((opt, i) => (
                <li key={i}>• {opt}</li>
              ))}
            </ul>
            <p className="text-green-600 mt-2">Answer: {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizModal;
