import React, { useState } from "react";

export default function Dashboard({ quizzes, results, setPage, createQuiz, editQuiz, startQuiz, randomize, setRandomize }) {
  const [title, setTitle] = useState("");
  const totalQuestions = quizzes.reduce((n, q) => n + q.questions.length, 0);
  const average = results.length ? Math.round(results.reduce((n, r) => n + r.percent, 0) / results.length) : 0;

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    createQuiz(title.trim());
    setTitle("");
  }

  return <main className="container">
    <section className="hero">
      <p>LEARN · CREATE · COMPETE</p>
      <h1>Build quizzes.<br /><span>Make learning fun.</span></h1>
      <p>Create interactive quizzes, test your knowledge and track results.</p>
    </section>

    <section className="stats">
      <article><small>Quizzes</small><strong>{quizzes.length}</strong></article>
      <article><small>Questions</small><strong>{totalQuestions}</strong></article>
      <article><small>Attempts</small><strong>{results.length}</strong></article>
      <article><small>Average score</small><strong>{average}%</strong></article>
    </section>

    <h2>Your quizzes</h2>
    <form className="create-form" onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter quiz title" />
      <button className="primary">＋ Create quiz</button>
    </form>

    <div className="quiz-grid">
      {quizzes.map(quiz => <article className="card" key={quiz.id}>
        <h3>{quiz.title}</h3>
        <p>{quiz.questions.length} questions</p>
        <div className="actions">
          <button className="secondary" onClick={() => editQuiz(quiz)}>Edit</button>
          <button className="primary" onClick={() => startQuiz(quiz)}>Start quiz</button>
        </div>
      </article>)}
    </div>
    <label className="random"><input type="checkbox" checked={randomize} onChange={e => setRandomize(e.target.checked)} /> Randomize questions</label>
  </main>;
}