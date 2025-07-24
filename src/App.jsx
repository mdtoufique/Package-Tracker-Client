import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Courier from "./pages/Courier";

export default function App() {
  const [view, setView] = useState("dashboard"); // or 'courier'

  return (
    <div>
      <nav className="bg-blue-700 text-white p-4 flex space-x-4">
        <button onClick={() => setView("dashboard")} className="hover:underline">
          Dispatcher Dashboard
        </button>
        <button onClick={() => setView("courier")} className="hover:underline">
          Courier Update
        </button>
      </nav>

      <main className="p-6">
        {view === "dashboard" && <Dashboard />}
        {view === "courier" && <Courier />}
      </main>
    </div>
  );
}
