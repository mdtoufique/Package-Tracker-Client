import { useEffect, useState } from "react";
import { fetchUnresolvedAlertCount } from "../services/api";

export function useUnresolvedAlertCount(pollInterval = 10000) {
  const [count, setCount] = useState(0);

  async function loadCount() {
    const count = await fetchUnresolvedAlertCount();
    setCount(count);
  }

  useEffect(() => {
    loadCount();
    const interval = setInterval(loadCount, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  return count;
}
