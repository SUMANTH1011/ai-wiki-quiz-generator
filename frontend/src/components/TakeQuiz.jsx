import { useState } from "react";

function TakeQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
    setCurrent(qIndex);
  };

  const score = quiz.reduce(
    (acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0),
    0
  );

  return (
    <div>
      {/* PROGRESS BAR */}
      <div className="mb-6">
        <p className="text-sm mb-2">
          Question {current + 1} / {quiz.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${((current + 1) / quiz.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {quiz.map((q, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800
                     p-5 mb-5 rounded-xl shadow"
        >
          <p className="font-semibold mb-2">
            {index + 1}. {q.question}
          </p>

          {Object.values(q.options).map((opt, i) => (
            <label key={i} className="block mt-2">
              <input
                type="radio"
                name={`q-${index}`}
                disabled={submitted}
                checked={answers[index] === opt}
                onChange={() => handleChange(index, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}

          {submitted && (
            <p className="mt-2 text-green-600">
              Correct: {q.answer}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="mt-4 text-xl font-bold">
          🎉 Score: {score} / {quiz.length}
        </p>
      )}
    </div>
  );
}

export default TakeQuiz;
