/* eslint-disable react-hooks/refs */
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useRef } from 'react';

import { useLocalStorageAdapter } from '@/hooks/use-local-storage';

import StorageKey from '../../const/storage-key';
import { createApiService } from '../../services/api-service';

type SessionContextValue = {
  authorize: (token: string) => void;
  client: ReturnType<typeof createApiService>;
  isAuthenticated: boolean;
  logout: () => void;
  token: null | string;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useLocalStorageAdapter<null | string>(StorageKey.ACCESS_TOKEN, null);
  const clientRef = useRef(createApiService(token ?? null));

  const value = useMemo<SessionContextValue>(() => {
    return {
      authorize: (newToken: string) => {
        setToken(newToken);
        clientRef.current.setToken(newToken);
      },
      client: clientRef.current,
      isAuthenticated: Boolean(token),
      logout: () => {
        setToken(null);
        clientRef.current.clearToken();
      },
      token: token ?? null,
    };
  }, [token, setToken]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('Missing Session Context');
  }
  return context;
};
