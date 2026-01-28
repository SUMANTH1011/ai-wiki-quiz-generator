function QuizModal({ quiz, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto
                      bg-white dark:bg-[#020617]
                      text-black dark:text-gray-200
                      p-6 rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{quiz.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Summary */}
        <p className="mb-6 text-gray-700 dark:text-gray-400">
          {quiz.summary}
        </p>

        {/* Questions */}
        {quiz.quiz.map((q, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded border
                       border-gray-300 dark:border-gray-700
                       bg-gray-50 dark:bg-slate-900"
          >
            <p className="font-semibold">
              {index + 1}. {q.question}
            </p>

            <ul className="ml-4 mt-2 space-y-1">
              {q.options.map((opt, i) => (
                <li key={i}>• {opt}</li>
              ))}
            </ul>

            <p className="text-green-600 dark:text-green-400 mt-2">
              Answer: {q.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizModal;
