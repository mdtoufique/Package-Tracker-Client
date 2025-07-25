import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Courier from "./pages/Courier";
import AlertDashboard from "./pages/AlertDashboard";
import { useUnresolvedAlertCount } from "./hooks/useUnresolvedAlertCount";

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem("view") || "home");
  const alertCount = useUnresolvedAlertCount();

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "dashboard", label: "Dispatcher Dashboard" },
    { key: "courier", label: "Courier Update" },
    { key: "alerts", label: "Alert Dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-8">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`relative inline-flex items-center px-3 py-2 text-sm font-medium transition
                    ${
                      view === key
                        ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold"
                        : "text-white hover:text-yellow-300 hover:border-b-2 hover:border-yellow-300"
                    }
                  `}
                >
                  {label}
                  {key === "alerts" && alertCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-red-100 bg-red-600 rounded-full">
                      {alertCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-6 bg-gray-50">
        {view === "home" && <Home />}
        {view === "dashboard" && <Dashboard />}
        {view === "courier" && <Courier />}
        {view === "alerts" && <AlertDashboard />}
      </main>
    </div>
  );
}
