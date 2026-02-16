import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

/**
 * Represents the options for customizing the behavior of serialization and deserialization.
 * @template T - The type of the state to be stored in local storage.
 */
type UseLocalStorageOptions<T> = {
  /** A function to deserialize the stored value. */
  deserializer?: (value: string) => T;

  /**
   * If `true` (default), the hook will initialize reading the local storage. In SSR, you should set it to `false`, returning the initial value initially.
   * @default true
   */
  initializeWithValue?: boolean;

  /** A function to serialize the value before storing it. */
  serializer?: (value: T) => string;
};

/**
 * Wrapper for localStorage `usehooks-ts` to adapt native
 * localStorage old ways of storing values with JSON-based
 * Can be removed with `useLocalStorage` in future release
 */
export function useLocalStorageAdapter<T>(
  key: string,
  initialValue: (() => T) | T,
  options?: UseLocalStorageOptions<T>,
): [T, Dispatch<SetStateAction<T>>, () => void] {
  let deserializer = undefined;

  if (options?.deserializer) {
    deserializer = options.deserializer;
  }

  deserializer = (value: string) => {
    // Support 'undefined' as a value
    if (value === 'undefined') {
      return undefined as unknown as T;
    }

    const defaultValue =
      typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;

    let parsed: unknown;

    try {
      const valueNormalized = /["{]/.test(value) ? value : `"${value}"`;

      parsed = JSON.parse(valueNormalized);
    } catch (error) {
      console.error('Error parsing JSON:', error);

      return defaultValue; // Return initialValue if parsing fails
    }

    return parsed as T;
  };

  return useLocalStorage<T>(key, initialValue, { ...options, deserializer });
}
