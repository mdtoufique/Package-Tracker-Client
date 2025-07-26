const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
// fetch currently active packages
export async function fetchPackages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/all`, {
		headers: {
			"Content-Type": "application/json",
			"x-api-token": API_TOKEN,
		},
	});
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

// fetch package history by package ID
export async function fetchPackageHistory(packageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/${packageId}/history`, {
		headers: {
			"Content-Type": "application/json",
			"x-api-token": API_TOKEN,
		},
	});
    if (!response.ok) {
      throw new Error('Failed to fetch package history');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching history for package ${packageId}:`, error);
    return [];
  }
}

// fetching alert
export async function fetchActiveAlerts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/alerts?resolved=false`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
}


// update packages
export async function updatePackage(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update package");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating package:", error);
    throw error;
  }
}

// alert count
export async function fetchUnresolvedAlertCount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/alerts/count?resolved=false`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch alert count");
    }

    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    console.error("Error fetching alert count:", error);
    return 0;
  }
}