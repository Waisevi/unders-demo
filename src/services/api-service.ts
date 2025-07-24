import { rpcRequest } from './rpc';
import QueriesKey from '../const/queries-key';

export const createApiService = (token: string | null = null) => {
  let currentToken = token;

  const setToken = (newToken: string) => {
    currentToken = newToken;
  };

  const clearToken = () => {
    currentToken = null;
  };

  const login = async (payload: { username: string; password: string }) => {
    return rpcRequest<{ token: string }>(QueriesKey.AUTH_LOGIN, payload);
  };

  return {
    setToken,
    clearToken,
    login,

    get token() {
      return currentToken;
    },
  };
};
