import React from "react";
import CourierUpdateForm from "../components/CourierUpdateForm";

export default function Courier() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Courier Package Update</h1>
        <CourierUpdateForm />
      </div>
    </div>
  );
}
