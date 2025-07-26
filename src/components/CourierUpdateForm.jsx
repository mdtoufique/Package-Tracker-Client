import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updatePackage } from "../services/api";

const statuses = [
  "CREATED",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "EXCEPTION",
  "CANCELLED",
];

export default function CourierUpdateForm() {
  const [form, setForm] = useState({
    package_id: "",
    status: "CREATED",
    lat: "",
    lon: "",
    note: "",
    eta: "",
  });

  const [timestamp, setTimestamp] = useState(
    new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(
        new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((f) => ({
          ...f,
          lat: position.coords.latitude.toFixed(6),
          lon: position.coords.longitude.toFixed(6),
        }));
        toast.success("📍 Location fetched");
      },
      (error) => {
        toast.error("Unable to get location: " + error.message);
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      package_id: form.package_id.trim(),
      status: form.status,
      lat: form.lat ? parseFloat(form.lat) : undefined,
      lon: form.lon ? parseFloat(form.lon) : undefined,
      timestamp: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      note: form.note.trim() || undefined,
      eta: form.eta ? new Date(new Date(form.eta).getTime() + 6 * 60 * 60 * 1000).toISOString() : undefined,
    };

    try {
      await updatePackage(payload);
      toast.success("✅ Package update submitted!");
      setForm({
        package_id: "",
        status: "CREATED",
        lat: "",
        lon: "",
        note: "",
        eta: "",
      });
    } catch (error) {
      toast.error("❌ Failed to submit: " + error.message, {
			autoClose: 5000, // 5 seconds
		});
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6 px-6 py-8 bg-white rounded-lg shadow-lg"
    >
      <Toaster position="top-center" />

      <h1 className="text-3xl text-center font-bold text-blue-700 mb-4">
        Update Package Status
      </h1>

      <label className="block">
        Package ID <span className="text-red-600">*</span>
        <input
          required
          type="text"
          name="package_id"
          value={form.package_id}
          onChange={handleChange}
          placeholder="Enter Package ID"
          className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        Status <span className="text-red-600">*</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block">
            Latitude
            <input
              type="number"
              step="any"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="flex-1">
          <label className="block">
            Longitude
            <input
              type="number"
              step="any"
              name="lon"
              value={form.lon}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="mb-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          title="Get current location"
        >
          Get Location
        </button>
      </div>

      <label className="block">
        Timestamp (auto)
        <input
          type="datetime-local"
          name="timestamp"
          value={timestamp}
          readOnly
          className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </label>

      <label className="block">
        Note
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          placeholder="Optional note"
          className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        ETA
        <input
          type="datetime-local"
          name="eta"
          value={form.eta}
          onChange={handleChange}
          placeholder="Optional"
          className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Submit Update
      </button>
    </form>
  );
}
