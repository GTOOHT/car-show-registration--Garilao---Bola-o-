import { useEffect, useState } from "react";

// Returns a copy of `value` that only updates after the user stops
// changing `value` for `delayMs` milliseconds. Used by the participant
// name search so we don't call the API on every keystroke.
export function useDebounce<T>(value: T, delayMs = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
