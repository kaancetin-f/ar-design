import { getApiConfig } from "./Config";

class Api {
  private _host?: string;
  private _core?: string;
  private _url: string;

  constructor(values: { host?: string; core?: string; init?: RequestInit }) {
    this._host = values.host || (typeof window !== "undefined" ? window.location.origin : "");
    this._core = values.core || "";

    // Url
    this._url = `${this._host}/${this._core ? this._core + "/" : ""}`;
  }

  async Get(values: { input?: RequestInfo | undefined; init?: RequestInit }): Promise<{
    p_response: Promise<Response>;
    response: Response;
  }> {
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

    const p_response = this.CustomFetch(`${this._url}${values.input}`, {
      method: "GET",
      ...values.init,
    });

    const clone = (await p_response).clone();
    const response = await clone;

    return { p_response, response };
  }

  async Post(values: {
    input?: RequestInfo;
    data?: any;
    init?: Omit<RequestInit, "body">;
  }): Promise<{ p_response: Promise<Response>; response: Response }> {
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

    const p_response = this.CustomFetch(`${this._url}${values.input}`, {
      method: "POST",
      body: JSON.stringify(values.data),
      ...values.init,
    });

    const clone = (await p_response).clone();
    const response = await clone;

    return { p_response, response };
  }

  async PostWithFormData(values: {
    input?: RequestInfo;
    data?: FormData;
    init?: Omit<RequestInit, "body">;
  }): Promise<Response> {
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "POST",
      body: values.data,
      ...values.init,
    });

    return response;
  }

  async Put(values: { input?: RequestInfo; data?: any; init?: Omit<RequestInit, "body"> }): Promise<Response> {
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "PUT",
      body: JSON.stringify(values.data),
      ...values.init,
    });

    return response;
  }

  async Delete(values: { input?: RequestInfo; init?: RequestInit }): Promise<Response> {
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "DELETE",
      ...values.init,
    });

    return response;
  }

  /**
   * Burada bir fetch işlemi gerçekleştirilmekte fakat farklı olarak burayı `interceptor` olarak kullanmaktayız.
   * @param input
   * @param init
   * @returns
   */
  private async CustomFetch(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    try {
      const config = getApiConfig();

      // Request merge: init + headers + global config
      let requestInit: RequestInit = {
        ...init,
        headers: {
          ...config.headers,
          ...init.headers,
        },
      };

      // Request interceptor (runtime'da eklenmiş olabilir.)
      if (config.requestInterceptor) [input, requestInit] = await config.requestInterceptor(input, requestInit);

      // Fetch çağrısı.
      const response = await fetch(input, requestInit);

      // Response interceptor.
      if (config.responseInterceptor) return await config.responseInterceptor(response);

      // Error handling
      if (!response.ok) {
        let message = `HTTP Error ${response.status}: ${response.statusText}`;
        switch (response.status) {
          case 400:
            console.error("400 Bad Request");
            break;
          case 401:
            console.error("401 Unauthorized");
            break;
          case 404:
            console.error("404 Not Found");
            break;
          default:
            console.error(message);
        }
        throw new Error(message);
      }

      return response;
    } catch (error) {
      // Network hatası veya fetch exception
      throw new Error(error instanceof Error ? error.message : "Network Error");
    }
  }
}

export default Api;
