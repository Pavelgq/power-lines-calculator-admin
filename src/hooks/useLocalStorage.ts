import { useEffect, useState } from "react";

const useLocalStorage = (
  key: string,
  initialValue = ""
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore quota / private mode
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
