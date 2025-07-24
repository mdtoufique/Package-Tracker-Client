
const dummyPackages = [
  {
    package_id: "PKG12345",
    status: "IN_TRANSIT",
    lat: 39.7684,
    lon: -86.1581,
    event_timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 mins ago
    received_at: new Date().toISOString(),
    note: "Departed Indy hub",
    eta: null,
  },
  {
    package_id: "PKG55510",
    status: "OUT_FOR_DELIVERY",
    lat: 39.7800,
    lon: -86.1000,
    event_timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 mins ago
    received_at: new Date().toISOString(),
    note: "At delivery vehicle",
    eta: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // in 30 mins
  },
  {
    package_id: "PKG90001",
    status: "IN_TRANSIT",
    lat: 39.7000,
    lon: -86.2100,
    event_timestamp: new Date(Date.now() - 47 * 60 * 1000).toISOString(), // 47 mins ago
    received_at: new Date().toISOString(),
    note: "Stuck at hub",
    eta: null,
  },
  {
    package_id: "PKG90009",
    status: "DELIVERED",
    lat: 39.7000,
    lon: -86.2100,
    event_timestamp: new Date(Date.now() - 47 * 60 * 1000).toISOString(), // 47 mins ago
    received_at: new Date().toISOString(),
    note: "Stuck at hub",
    eta: null,
  },
  {
    package_id: "PKG90019",
    status: "PICKED_UP",
    lat: 39.7000,
    lon: -81.2100,
    event_timestamp: new Date(Date.now() - 47 * 60 * 1000).toISOString(), // 47 mins ago
    received_at: new Date().toISOString(),
    note: "Stuck at hub",
    eta: null,
  },
];

// Mock fetch function returning Promise resolving to dummy data
export async function fetchActivePackages() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
  return dummyPackages;
}
