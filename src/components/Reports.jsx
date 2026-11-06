import React from "react";

export default function Reports({ results, onBack }) {
  return <main className="container">
    <button className="back" onClick={onBack}>← Dashboard</button>
    <section className="panel">
      <h2>Quiz reports</h2>
      {results.length === 0 ? <p className="muted">No quiz attempts yet. Start a quiz to see reports.</p> :
        <div className="reports">
          <div className="report report-head"><b>Quiz</b><b>Score</b><b>Percentage</b><b>Date</b></div>
          {[...results].reverse().map(result => <div className="report" key={result.id}>
            <span>{result.quizTitle}</span><span>{result.correct}/{result.total}</span><b>{result.percent}%</b><small>{result.date}</small>
          </div>)}
        </div>}
    </section>
  </main>;
}