import React, { useEffect, useState } from "react";
import PackageList from "../components/PackageList";
import { fetchPackages } from "../services/api";

export default function Dashboard() {
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("ACTIVE");

	useEffect(() => {
		let intervalId;

		async function loadPackages() {
			try {
				const data = await fetchPackages();
				setPackages(data);
			} catch (err) {
				console.error("Failed to fetch packages:", err);
			} finally {
				setLoading(false);
			}
		}

		loadPackages();
		intervalId = setInterval(loadPackages, 5000);
		return () => clearInterval(intervalId);
	}, []);

	// const filteredPackages = packages.filter((pkg) => {
	// 	const matchSearch = pkg.package_id
	// 		.toLowerCase()
	// 		.includes(search.toLowerCase());
	// 	const matchStatus =
	// 		statusFilter === "ACTIVE" || pkg.status === statusFilter;
	// 	return matchSearch && matchStatus;
	// });
  
  const filteredPackages = packages.filter((pkg) => {
	const matchSearch = pkg.package_id
		.toLowerCase()
		.includes(search.toLowerCase());

	let matchStatus;
	if (statusFilter === "ACTIVE") {
		matchStatus = pkg.status !== "DELIVERED" && pkg.status !== "CANCELLED";
	} else if (statusFilter === "INACTIVE") {
		matchStatus = pkg.status === "DELIVERED" || pkg.status === "CANCELLED";
	} else {
		matchStatus = pkg.status === statusFilter;
	}

	return matchSearch && matchStatus;
});

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen text-gray-500">
				Loading packages...
			</div>
		);
	}

	return (
		
			<div className="max-w-7xl bg-gray-50 mx-auto bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
				<h1  className="text-3xl text-center font-bold text-blue-700 mb-4">
        	Aamira Package Tracker
				</h1>

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<input
						type="text"
						placeholder="Search by Package ID"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
					/>

					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="w-full sm:w-56 px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
					>
						<option value="ACTIVE">Active</option>
						<option value="CREATED">CREATED</option>
						<option value="PICKED_UP">PICKED_UP</option>
						<option value="IN_TRANSIT">IN_TRANSIT</option>
						<option value="OUT_FOR_DELIVERY">
							OUT_FOR_DELIVERY
						</option>
						<option value="EXCEPTION">EXCEPTION</option>
						<option value="STUCK">STUCK</option>
            <option value="INACTIVE">INACTIVE</option>
					</select>
				</div>

				<PackageList packages={filteredPackages} />
			</div>
		
	);
}
