import React from "react";
import StatusBadge from "./StatusBadge";

function formatTimeAgo(dateString) {
  // Get current time in BD timezone (UTC+6)
  const nowBd = Date.now() + 6 * 60 * 60 * 1000;
  const diffMs = nowBd - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins === 1) return "1 minute ago";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return "1 hour ago";
  return `${diffHours} hours ago`;
}

export default function PackageList({ packages }) {
  return (
    <table className="w-full border-collapse text-left text-gray-700">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="py-3 px-4">Package ID</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Last Update</th>
          <th className="py-3 px-4">Location</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((pkg, idx) => (
          <tr
            key={pkg.package_id}
            className={`cursor-pointer hover:bg-blue-50 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="py-3 px-4 font-mono">{pkg.package_id}</td>
            <td className="py-3 px-4">
              <StatusBadge status={pkg.status} />
            </td>
            <td className="py-3 px-4">{formatTimeAgo(pkg.event_timestamp)}</td>
            <td className="py-3 px-4">
              {pkg.lat && pkg.lon
                ? `${pkg.lat.toFixed(4)}, ${pkg.lon.toFixed(4)}`
                : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
