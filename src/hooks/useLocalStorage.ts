import { useEffect, useState } from "react";


const useLocalStorage = (key: string, initialValue = ''): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => localStorage.getItem(key) || initialValue);
  
  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage;