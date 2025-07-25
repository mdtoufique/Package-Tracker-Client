import React, { useEffect, useState } from "react";
import StatusBadge from "./StatusBadge";
import PackageHistoryModal from "./PackageHistoryModal";
import { fetchPackageHistory } from "../services/api";
function formatTimeAgo(dateString) {
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
	const [modalOpen, setModalOpen] = useState(false);
	const [history, setHistory] = useState([]);
	const [loadingHistory, setLoadingHistory] = useState(false);
	const [selectedPackage, setSelectedPackage] = useState(null);
  useEffect(() => {
	if (modalOpen) {
		document.body.style.overflow = "hidden"; // disable scroll
	} else {
		document.body.style.overflow = "auto"; // re-enable scroll
	}
	return () => {
		document.body.style.overflow = "auto"; // cleanup
	};
}, [modalOpen]);

	async function showDetails(packageId) {
	setSelectedPackage(packageId);
	setLoadingHistory(true);
	setModalOpen(true);
	try {
		const data = await fetchPackageHistory(packageId); // ✅ use reusable function
		setHistory(data);
	} catch (err) {
		setHistory([]);
		alert("Error loading history: " + err.message);
	} finally {
		setLoadingHistory(false);
	}
}

	function closeModal() {
		setModalOpen(false);
		setHistory([]);
		setSelectedPackage(null);
	}

	return (
		<>
			<table className="w-full border-collapse text-left text-gray-700 text-sm">
				<thead>
					<tr className="border-b border-gray-300 bg-gray-100">
						<th className="py-2 px-3">Package ID</th>
						<th className="py-2 px-3">Status</th>
						<th className="py-2 px-3">Last Update</th>
						<th className="py-2 px-3">Location</th>
						<th className="py-2 px-3">Note</th>
						<th className="py-2 px-3">ETA</th>
						<th className="py-2 px-3">Received At</th>
						<th className="py-2 px-3 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{packages.map((pkg, idx) => (
						<tr
							key={pkg.package_id}
							className={`hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
						>
							<td className="py-2 px-3 font-mono">{pkg.package_id}</td>
							<td className="py-2 px-3">
								<StatusBadge status={pkg.status} />
							</td>
							<td className="py-2 px-3">{formatTimeAgo(pkg.event_timestamp)}</td>
							<td className="py-2 px-3">
								{pkg.lat && pkg.lon
									? `${pkg.lat.toFixed(4)}, ${pkg.lon.toFixed(4)}`
									: "—"}
							</td>
							<td className="py-2 px-3">{pkg.note || "—"}</td>
							<td className="py-2 px-3">
								{pkg.eta
									? new Date(pkg.eta).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
											hour12: true,
											timeZone: "UTC",
									  })
									: "—"}
							</td>
							<td className="py-2 px-3">
								{pkg.received_at
									? new Date(pkg.received_at).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
											hour12: true,
											timeZone: "UTC",
									  })
									: "—"}
							</td>
							<td className="py-2 px-3 text-center">
								<button
									className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors duration-200"
									onClick={() => showDetails(pkg.package_id)}
								>
									Show Details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<PackageHistoryModal
				isOpen={modalOpen}
				onClose={closeModal}
				history={history}
				loading={loadingHistory}
				packageId={selectedPackage}
			/>
		</>
	);
}
