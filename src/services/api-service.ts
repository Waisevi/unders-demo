import QueriesKey from '../const/queries-key';
import { rpcRequest } from './rpc';

export const createApiService = (token: null | string = null) => {
  let currentToken = token;

  const setToken = (newToken: string) => {
    currentToken = newToken;
  };

  const clearToken = () => {
    currentToken = null;
  };

  const login = async (payload: { password: string; username: string }) => {
    return rpcRequest<{ token: string }>(QueriesKey.AUTH_LOGIN, payload);
  };

  return {
    clearToken,
    login,
    setToken,

    get token() {
      return currentToken;
    },
  };
};
