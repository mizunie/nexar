import { ApiResponse } from "./types";

export interface HttpClientOptions {
  baseUrl: string;
  authToken?: string;
  headers?: Record<string, string>;
}

export class HttpClient {
  private baseUrl: string;
  private authToken?: string;
  private headers: Record<string, string>;

  constructor(options: HttpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.authToken = options.authToken;
    this.headers = options.headers ?? {};
  }

  async post<TResponse = unknown, TBody = unknown>(
    endpoint: string,
    body: TBody
  ): Promise<ApiResponse<TResponse>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.authToken && { authorization: `Bearer ${this.authToken}` }),
        ...this.headers,
      },
      body: JSON.stringify(body),
    });

    let parsed: any = null;

    try {
      parsed = await response.json();
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      return {
        code: response.status,
        msg:
          parsed?.msg ??
          `Request failed with status ${response.status}`,
        errorDetail: parsed,
      };
    }

    return {
      code: response.status,
      msg: parsed?.msg ?? "Request successful",
      data: parsed?.data ?? parsed,
      pagination: parsed?.pagination,
    };
  }
}
