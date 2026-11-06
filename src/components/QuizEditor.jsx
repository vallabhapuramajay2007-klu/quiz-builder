import React, { useState } from "react";

const emptyDraft = () => ({ type: "mcq", question: "", options: ["", "", "", ""], answer: "" });

export default function QuizEditor({ quiz, onSave, onBack }) {
  const [questions, setQuestions] = useState(quiz.questions.map(q => ({ ...q, options: [...(q.options || [])] })));
  const [draft, setDraft] = useState(emptyDraft());

  function addQuestion(e) {
    e.preventDefault();
    if (!draft.question.trim() || !draft.answer.trim()) return;
    const options = draft.type === "mcq" ? draft.options.map(x => x.trim()).filter(Boolean)
      : draft.type === "truefalse" ? ["True", "False"] : [];
    if (draft.type === "mcq" && (options.length < 2 || !options.includes(draft.answer))) {
      alert("Add at least two options and enter the correct answer exactly as an option.");
      return;
    }
    setQuestions(old => [...old, { ...draft, id: Date.now(), options }]);
    setDraft(emptyDraft());
  }

  function changeType(type) {
    setDraft({ ...emptyDraft(), type, options: type === "truefalse" ? ["True", "False"] : type === "open" ? [] : ["", "", "", ""] });
  }

  return <main className="container">
    <button className="back" onClick={onBack}>← Dashboard</button>
    <section className="panel">
      <h2>Edit: {quiz.title}</h2>
      <form className="editor-form" onSubmit={addQuestion}>
        <label>Question type
          <select value={draft.type} onChange={e => changeType(e.target.value)}>
            <option value="mcq">Multiple choice</option>
            <option value="truefalse">True / False</option>
            <option value="open">Open-ended</option>
          </select>
        </label>
        <label>Question
          <input value={draft.question} onChange={e => setDraft({ ...draft, question: e.target.value })} placeholder="Type your question" required />
        </label>
        {draft.type === "mcq" && <div className="option-grid">
          {draft.options.map((option, i) => <input key={i} placeholder={`Option ${i + 1}`} value={option}
            onChange={e => setDraft({ ...draft, options: draft.options.map((v, j) => j === i ? e.target.value : v) })} />)}
        </div>}
        {draft.type === "truefalse" && <p className="muted">Available answers: True or False</p>}
        <label>Correct answer
          <input value={draft.answer} onChange={e => setDraft({ ...draft, answer: e.target.value })} placeholder="Enter exact correct answer" required />
        </label>
        <button className="primary">Add question</button>
      </form>
      <h3>Questions ({questions.length})</h3>
      {questions.map((q, i) => <div className="question-row" key={q.id}>
        <span>{i + 1}. {q.question}<small>{q.type} · Answer: {q.answer}</small></span>
        <button className="danger" onClick={() => setQuestions(old => old.filter(x => x.id !== q.id))}>Remove</button>
      </div>)}
      <button className="primary save" onClick={() => onSave({ ...quiz, questions })}>Save quiz</button>
    </section>
  </main>;
}