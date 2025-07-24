import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Courier from "./pages/Courier";
import AlertDashboard from "./pages/AlertDashboard";

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem("view") || "dashboard");

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  return (
    <div>
      <nav className="bg-blue-700 text-white p-4 flex space-x-4">
        <button
          onClick={() => setView("dashboard")}
          className={`hover:underline ${view === "dashboard" ? "font-bold underline" : ""}`}
        >
          Dispatcher Dashboard
        </button>
        <button
          onClick={() => setView("courier")}
          className={`hover:underline ${view === "courier" ? "font-bold underline" : ""}`}
        >
          Courier Update
        </button>
        <button
          onClick={() => setView("alerts")}
          className={`hover:underline ${view === "alerts" ? "font-bold underline" : ""}`}
        >
          Alert Dashboard
        </button>
      </nav>

      <main className="p-6">
        {view === "dashboard" && <Dashboard />}
        {view === "courier" && <Courier />}
        {view === "alerts" && <AlertDashboard />}
      </main>
    </div>
  );
}
