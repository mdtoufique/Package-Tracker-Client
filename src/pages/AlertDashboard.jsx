import React, { useState, useEffect } from "react";
import { fetchActiveAlerts } from "../services/api";

export default function AlertDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadAlerts() {
    setError(null);
    try {
      const data = await fetchActiveAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading alerts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-red-100 text-red-800 rounded shadow text-center">
        Error: {error}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-600 rounded shadow text-center">
        No active alerts
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-4">
      Active Alerts
      </h1>
      <ul className="space-y-4">
        {alerts.map((alert) => (
          <li
            key={alert._id}
            className="flex flex-col md:flex-row md:justify-between md:items-center border border-red-300 rounded-lg p-4 bg-red-50 hover:bg-red-100 transition"
          >
            <p className="font-semibold text-red-800 text-lg">{alert.message}</p>
            <p className="mt-2 md:mt-0 text-sm text-gray-500 italic whitespace-nowrap">
              Created at:{" "}
              {new Date(alert.created_at).toLocaleString("en-US", {
                hour12: true,
                timeZone: "UTC",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
