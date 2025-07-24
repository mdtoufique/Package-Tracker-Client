import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  const [timestamp, setTimestamp] = useState(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toISOString().slice(0, 16));
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
      eta: form.eta ? new Date(form.eta).toISOString() : undefined,
    };

    try {
      const res = await fetch("http://localhost:5000/api/packages/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

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
      toast.error("❌ Failed to submit: " + error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow rounded space-y-4"
    >
      <Toaster position="top-center" />

      <h2 className="text-xl font-bold mb-2">Courier Package Update</h2>

      <label className="block">
        Package ID <span className="text-red-600">*</span>
        <input
          required
          type="text"
          name="package_id"
          value={form.package_id}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-2 py-1"
        />
      </label>

      <label className="block">
        Status <span className="text-red-600">*</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-2 py-1"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </label>

      <div className="flex space-x-2 items-center">
        <div className="flex-1">
          <label className="block">
            Latitude
            <input
              type="number"
              step="any"
              name="lat"
              value={form.lat}
              onChange={handleChange}
              className="w-full mt-1 border rounded px-2 py-1"
              placeholder="Optional"
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
              className="w-full mt-1 border rounded px-2 py-1"
              placeholder="Optional"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          className="mt-6 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
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
          className="w-full mt-1 border rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
        />
      </label>

      <label className="block">
        Note
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          className="w-full mt-1 border rounded px-2 py-1"
          placeholder="Optional note"
        />
      </label>

      <label className="block">
        ETA
        <input
          type="datetime-local"
          name="eta"
          value={form.eta}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-2 py-1"
          placeholder="Optional"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Update
      </button>
    </form>
  );
}
