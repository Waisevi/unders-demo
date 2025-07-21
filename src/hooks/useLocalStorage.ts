/* eslint-disable  */
import { useState } from 'react';
import StorageKey from '../const/storage-key';

/*
 * Returns task controls of a specific type.
 * @param key LocalStorage key.
 * @param fallbackValue The default value for the key.
 */
export default function useLocalStorage<T>(key: StorageKey, defaultValue?: T) {
  const [data, setData] = useState<T | undefined>(() => {
    if (typeof localStorage === 'undefined') {
      return defaultValue;
    }

    const loadedData = localStorage.getItem(key);

    if (loadedData) {
      let parsedValue: any;

      try {
        parsedValue = JSON.parse(loadedData);
      } catch (e) {
        parsedValue = loadedData;
      }

      return parsedValue;
    }
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }

    return defaultValue;
  });

  function setLocalData(value?: T) {
    setData(value);

    if (typeof localStorage === 'undefined') {
      return;
    }

    if (typeof value === 'undefined') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  return [data, setLocalData] as const;
}
