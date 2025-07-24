import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Courier from "./pages/Courier";
import AlertDashboard from "./pages/AlertDashboard"; // <-- add this line

export default function App() {
  const [view, setView] = useState("dashboard"); // 'dashboard' | 'courier' | 'alerts'

  return (
    <div>
      <nav className="bg-blue-700 text-white p-4 flex space-x-4">
        <button onClick={() => setView("dashboard")} className="hover:underline">
          Dispatcher Dashboard
        </button>
        <button onClick={() => setView("courier")} className="hover:underline">
          Courier Update
        </button>
        <button onClick={() => setView("alerts")} className="hover:underline">
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
