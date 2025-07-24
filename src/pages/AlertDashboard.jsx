import React, { useState, useEffect } from "react";

export default function AlertDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchAlerts() {
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/alerts?resolved=false");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000); // 30 sec polling
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading alerts...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (alerts.length === 0) {
    return <div className="p-4 text-center text-gray-600">No active alerts</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Active Alerts</h2>
      <ul className="space-y-4">
        {alerts.map((alert) => (
          <li key={alert._id} className="border p-4 rounded bg-red-50">
            <p className="font-semibold text-red-700">{alert.message}</p>
            <p className="text-sm text-gray-600">
              Created at: {new Date(alert.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
