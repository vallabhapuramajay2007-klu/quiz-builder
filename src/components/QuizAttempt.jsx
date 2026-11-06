import React, { useState } from "react";

export default function QuizAttempt({ quiz, onSubmit, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = quiz.questions[index];

  return <main className="container">
    <section className="panel">
      <button className="back" onClick={onExit}>← Exit quiz</button>
      <div className="attempt-heading"><span>{quiz.title}</span><b>Question {index + 1} of {quiz.questions.length}</b></div>
      <div className="progress"><span style={{ width: `${((index + 1) / quiz.questions.length) * 100}%` }} /></div>
      <h2>{question.question}</h2>
      {question.type === "open" ? <textarea rows="4" placeholder="Type your answer" value={answers[question.id] || ""}
        onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })} /> :
        <div className="answer-list">{question.options.map(option => <button key={option}
          className={`answer ${answers[question.id] === option ? "selected" : ""}`}
          onClick={() => setAnswers({ ...answers, [question.id]: option })}>{option}</button>)}</div>}
      <div className="attempt-actions">
        <button className="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button>
        {index < quiz.questions.length - 1
          ? <button className="primary" onClick={() => setIndex(index + 1)}>Next question</button>
          : <button className="primary" onClick={() => onSubmit(quiz, answers)}>Submit quiz</button>}
      </div>
    </section>
  </main>;
}