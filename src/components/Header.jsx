import React from "react";

export default function Header({ setPage }) {
  return <header className="header">
    <button className="brand" onClick={() => setPage("home")}>📝 Quiz Builder</button>
    <nav>
      <button onClick={() => setPage("home")}>Dashboard</button>
      <button onClick={() => setPage("reports")}>Reports</button>
    </nav>
  </header>;
}