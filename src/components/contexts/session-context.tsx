import React, { createContext, useContext, useMemo, useRef, FC, PropsWithChildren } from 'react';
import { createApiService } from '../../services/api-service';
import useLocalStorage from '../../hooks/useLocalStorage';
import StorageKey from '../../const/storage-key';

type SessionContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  client: ReturnType<typeof createApiService>;
  authorize: (token: string) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useLocalStorage<string | null>(StorageKey.ACCESS_TOKEN, null);
  const clientRef = useRef(createApiService(token ?? null));

  const value = useMemo<SessionContextValue>(() => {
    return {
      token: token ?? null,
      isAuthenticated: Boolean(token),
      client: clientRef.current,
      authorize: (newToken: string) => {
        setToken(newToken);
        clientRef.current.setToken(newToken);
      },
      logout: () => {
        setToken(null);
        clientRef.current.clearToken();
      },
    };
  }, [token, setToken]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('Missing Session Context');
  return context;
};
