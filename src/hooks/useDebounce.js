import { useRef, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedFunction = (...args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, []);

  return debouncedFunction;
};

export default useDebounce;
