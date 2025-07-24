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
