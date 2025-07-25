const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchActivePackages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/active`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

// NEW: fetch package history by package ID
export async function fetchPackageHistory(packageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/packages/${packageId}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch package history');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching history for package ${packageId}:`, error);
    return [];
  }
}
