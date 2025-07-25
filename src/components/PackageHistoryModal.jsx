import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
export default function PackageHistoryModal({
	isOpen,
	onClose,
	history,
	loading,
	packageId,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[5px] bg-white/10">
			<div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-lg shadow-xl p-6">
				<button
					className="absolute top-1 right-1 text-gray-600 hover:text-red-600 font-extrabold transition duration-150"
					onClick={onClose}
					aria-label="Close modal"
				>
					<XMarkIcon className="h-8 w-8" />
				</button>

				{loading ? (
					<p>Loading history...</p>
				) : history.length === 0 ? (
					<p>No history found.</p>
				) : (
					<>
						<h2 className="text-xl font-bold mb-4">
							History for package: {packageId}
						</h2>
						<table className="w-full text-sm text-gray-700 border-collapse">
							<thead>
								<tr className="border-b border-gray-300 bg-gray-100">
									<th className="py-1 px-2 text-left">
										Status
									</th>
									<th className="py-1 px-2 text-left">
										Timestamp (UTC)
									</th>
									<th className="py-1 px-2 text-left">
										Location
									</th>
									<th className="py-1 px-2 text-left">
										Note
									</th>
									<th className="py-1 px-2 text-left">ETA</th>
								</tr>
							</thead>
							<tbody>
								{history.map((event, idx) => (
									<tr
										key={idx}
										className={
											idx % 2 === 0
												? "bg-white"
												: "bg-gray-50"
										}
									>
										<td className="py-1 px-2 font-mono">
											{event.status}
										</td>
										<td className="py-1 px-2">
											{new Date(
												event.event_timestamp
											).toLocaleString("en-US", {
												hour12: true,
												timeZone: "UTC",
											})}
										</td>
										<td className="py-1 px-2">
											{event.lat && event.lon
												? `${event.lat.toFixed(
														4
												  )}, ${event.lon.toFixed(4)}`
												: "—"}
										</td>
										<td className="py-1 px-2">
											{event.note || "—"}
										</td>
										<td className="py-1 px-2">
											{event.eta
												? new Date(
														event.eta
												  ).toLocaleString("en-US", {
														hour12: true,
														timeZone: "UTC",
												  })
												: "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				)}
			</div>
		</div>
	);
}
