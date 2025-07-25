import React from "react";
import courierImg from "../assets/courier.jpg";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto text-center p-6 bg-white rounded shadow">
      <img
        src={courierImg}
        alt="Courier Illustration"
        className="mx-auto mb-6 max-w-xs rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Aamira Package Tracker</h1>
      <p className="text-gray-700 text-lg">
        This is a lightweight real-time courier tracking system built using the MERN stack. It
        allows dispatchers and couriers to manage and update package deliveries efficiently with
        real-time alerting, history tracking, and status monitoring.
      </p>
      <p className="mt-4 text-gray-600 text-sm">
        Includes features like map coordinates, ETA tracking, stuck alert detection, and
        customizable UI with live updates.
      </p>
    </div>
  );
}
