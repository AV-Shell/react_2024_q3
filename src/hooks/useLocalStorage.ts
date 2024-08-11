'use client';
/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { storage } from '../services/localstorage.service';

export function useLocalStorage<T>(
  initialValue: T,
  variableName: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  function getDefaultValue() {
    return storage.getItem<T>(variableName) ?? initialValue;
  }
  const [value, setValue] = useState(getDefaultValue);

  useEffect(() => {
    storage.setItem(variableName, value);
    // no need to do it, but i left it for student 1 crosscheck (set to localstorage on unmount)
    return () => {
      storage.setItem(variableName, value);
    };
  }, [value]);

  return [value, setValue];
}
