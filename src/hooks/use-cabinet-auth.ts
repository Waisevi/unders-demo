/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from 'react';

// MOCK: Cabinet auth - accepts any credentials, persists in localStorage
const STORAGE_KEY = 'cabinet-mock-auth';

export const useCabinetAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem(STORAGE_KEY));
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'mock-token');
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, isLoading, login, logout };
};
