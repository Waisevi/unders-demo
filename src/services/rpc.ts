/* eslint-disable @typescript-eslint/no-explicit-any */
export async function rpcRequest<TResponse = any>(
  method: string,
  params?: Record<string, unknown>,
  token?: string,
): Promise<TResponse> {
  const body = {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now(),
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');

  const url = new URL('/rpc', baseUrl);
  url.search = `?${method}`;

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (json.error) {
    return Promise.reject(new Error(json.error.message));
  }

  return json.result;
}
