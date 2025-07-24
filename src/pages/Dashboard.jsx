import React, { useEffect, useState } from "react";
import PackageList from "../components/PackageList";
import { fetchActivePackages } from "../services/api";

export default function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await fetchActivePackages();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading packages...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Aamira Package Tracker</h1>
        <PackageList packages={packages} />
      </div>
    </div>
  );
}
