import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import QuizEditor from "./components/QuizEditor.jsx";
import QuizAttempt from "./components/QuizAttempt.jsx";
import Reports from "./components/Reports.jsx";
import { sampleQuizzes } from "./data/sampleQuizzes.js";
import { loadData, saveData } from "./utils/storage.js";

export default function App() {
  const [quizzes, setQuizzes] = useState(() => loadData("qb_quizzes", sampleQuizzes));
  const [results, setResults] = useState(() => loadData("qb_results", []));
  const [page, setPage] = useState("home");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [randomize, setRandomize] = useState(true);

  useEffect(() => saveData("qb_quizzes", quizzes), [quizzes]);
  useEffect(() => saveData("qb_results", results), [results]);

  function createQuiz(title) {
    const quiz = { id: Date.now(), title, questions: [] };
    setQuizzes(old => [...old, quiz]);
    setActiveQuiz(quiz);
    setPage("editor");
  }

  function editQuiz(quiz) {
    setActiveQuiz(quiz);
    setPage("editor");
  }

  function saveQuiz(updatedQuiz) {
    setQuizzes(old => old.map(q => q.id === updatedQuiz.id ? updatedQuiz : q));
    setPage("home");
  }

  function startQuiz(quiz) {
    if (!quiz.questions.length) {
      alert("Add questions to this quiz before starting.");
      return;
    }
    const questions = randomize ? [...quiz.questions].sort(() => Math.random() - 0.5) : quiz.questions;
    setActiveQuiz({ ...quiz, questions });
    setPage("attempt");
  }

  function submitQuiz(quiz, answers) {
    const correct = quiz.questions.filter(q =>
      (answers[q.id] || "").trim().toLowerCase() === q.answer.trim().toLowerCase()
    ).length;
    const result = {
      id: Date.now(), quizTitle: quiz.title, correct, total: quiz.questions.length,
      percent: Math.round(correct / quiz.questions.length * 100),
      date: new Date().toLocaleString()
    };
    setResults(old => [...old, result]);
    setActiveQuiz({ ...quiz, result });
    setPage("result");
  }

  return <>
    <Header setPage={setPage} />
    {page === "home" && <Dashboard quizzes={quizzes} results={results} setPage={setPage}
      createQuiz={createQuiz} editQuiz={editQuiz} startQuiz={startQuiz}
      randomize={randomize} setRandomize={setRandomize} />}
    {page === "editor" && activeQuiz && <QuizEditor quiz={activeQuiz} onSave={saveQuiz} onBack={() => setPage("home")} />}
    {page === "attempt" && activeQuiz && <QuizAttempt quiz={activeQuiz} onSubmit={submitQuiz} onExit={() => setPage("home")} />}
    {page === "reports" && <Reports results={results} onBack={() => setPage("home")} />}
    {page === "result" && activeQuiz?.result && <main className="container"><section className="panel result">
      <div className="success">✓</div><h2>Quiz completed!</h2><div className="big-score">{activeQuiz.result.percent}%</div>
      <p>You scored {activeQuiz.result.correct} out of {activeQuiz.result.total}.</p>
      <button className="primary" onClick={() => setPage("home")}>Back to dashboard</button>
      <button className="secondary" onClick={() => setPage("reports")}>View reports</button>
    </section></main>}
    <footer>Quiz Builder · React + Vite · Local Storage demo</footer>
  </>;
}