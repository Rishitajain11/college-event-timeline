import React, { useState } from "react";
import StudentView from "./pages/StudentView";
import AdminView from "./pages/AdminView";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-icon">🎓</span>
            <div>
              <h1 className="brand-title">College Event Timeline</h1>
              <p className="brand-sub">Stay updated with upcoming events</p>
            </div>
          </div>
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              📅 Student View
            </button>
            <button
              className={`tab-btn ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              ➕ Admin — Add Event
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {activeTab === "student" ? <StudentView /> : <AdminView />}
      </main>
    </div>
  );
}

export default App;