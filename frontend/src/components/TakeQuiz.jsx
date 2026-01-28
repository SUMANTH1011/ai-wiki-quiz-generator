import { useState } from "react";

function TakeQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleChange = (qIndex, option) => {
    if (submitted) return;
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
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
          {/* QUESTION */}
          <p className="font-semibold mb-3">
            {index + 1}. {q.question}
          </p>

          {/* OPTIONS */}
          {Object.values(q.options).map((opt, i) => {
            const isSelected = answers[index] === opt;
            const isCorrect = opt === q.answer;

            let optionStyle =
              "flex items-center gap-2 p-3 rounded cursor-pointer transition ";

            if (submitted) {
              if (isCorrect) {
                optionStyle +=
                  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
              } else if (isSelected) {
                optionStyle +=
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
              } else {
                optionStyle += "text-gray-500";
              }
            } else {
              optionStyle +=
                "hover:bg-gray-100 dark:hover:bg-gray-700";
            }

            return (
              <label key={i} className={optionStyle}>
                <input
                  type="radio"
                  name={`q-${index}`}
                  disabled={submitted}
                  checked={isSelected}
                  onChange={() => handleChange(index, opt)}
                />
                {opt}
              </label>
            );
          })}
        </div>
      ))}

      {/* SUBMIT / SCORE */}
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="bg-green-600 hover:bg-green-700
                     text-white px-6 py-2 rounded-xl font-semibold"
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
