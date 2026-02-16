/**
 * Represents a remote procedure call error
 */
export class ApiError extends Error {
  /**
   * RPC code error, if any
   */
  public readonly code: number | undefined;

  /**
   * RPC error data, if any
   */
  public readonly data: any | undefined;

  /**
   * Initialization params, used to construct the API request
   */
  public readonly request: Request;

  /**
   * Remote API response that was returned by the server
   */
  public readonly response: Response;

  /**
   * RPC server error message, if any
   */
  public readonly serverMessage: string | undefined;

  /**
   * Constructs this API error instance
   * @param request Request initialization params
   * @param response Remote API response data
   */
  public constructor(request: Request, response: any) {
    const code = response?.error?.code ?? '';
    const message = response?.error?.message;
    const detail = message ? `: ${message}` : '';
    super(`[${request.method ?? 'GET'}] "${request.url}": An error ${code} occurred${detail}`);
    this.name = 'ApiError';

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    const proto = new.target.prototype;

    if (Object.setPrototypeOf == null) {
      (this as any).__proto__ = proto;
    } else {
      Object.setPrototypeOf(this, proto);
    }

    this.request = request;
    this.response = response;
    this.code = response?.error?.code === undefined ? undefined : Number(response.error.code);
    this.data = response?.error?.data;
    this.serverMessage = response?.error?.message;
  }
}
