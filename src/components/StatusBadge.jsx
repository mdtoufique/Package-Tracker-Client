import React from "react";

export default function StatusBadge({ status }) {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
  const statusColors = {
    CREATED: "bg-gray-200 text-gray-800",
    PICKED_UP: "bg-blue-200 text-blue-800",
    IN_TRANSIT: "bg-yellow-200 text-yellow-800",
    OUT_FOR_DELIVERY: "bg-indigo-200 text-indigo-800",
    DELIVERED: "bg-green-200 text-green-800",
    EXCEPTION: "bg-red-200 text-red-800",
    CANCELLED: "bg-gray-400 text-gray-900",
  };
  return (
    <span className={`${baseClasses} ${statusColors[status] || "bg-gray-200 text-gray-800"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
