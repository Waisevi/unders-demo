import { ApiError } from './api-error';

export async function rpcRequest<TResponse = any>(
  method: string,
  params?: Record<string, unknown>,
  token?: string,
  signal?: AbortSignal,
): Promise<TResponse> {
  const body = {
    id: crypto.randomUUID(),
    jsonrpc: '2.0',
    method,
    params,
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const url = new URL('/rpc', baseUrl);
  url.search = `?${method}`;

  const request = new Request(url.toString(), {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    method: 'POST',
    signal,
  });

  const response = await fetch(request);

  const json = await response.json();

  if (json.error) {
    const httpError = new ApiError(request, json);

    return Promise.reject(httpError);
  }

  return json.result;
}
