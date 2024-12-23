class Api {
  private _host?: string;
  private _core?: string;
  private _token?: string;
  private _url: string;

  constructor(values: { host?: string; core?: string; token?: string }) {
    this._host = values.host || (typeof window !== "undefined" ? window.location.origin : "");
    this._core = values.core || "";
    this._token = values.token;

    // Url
    this._url = `${this._host}/${this._core ? this._core + "/" : ""}`;
  }

  async Get(values: { input?: RequestInfo | undefined; headers?: HeadersInit }): Promise<Response> {
    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "GET",
      headers: {
        ...this.HeaderProperties(),
        ...values.headers,
      },
    });

    return response;
  }

  async Post(values: {
    input?: RequestInfo;
    data?: any;
    headers?: HeadersInit;
    init?: Omit<RequestInit | undefined, "body">;
  }): Promise<Response> {
    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "POST",
      headers: { ...this.HeaderProperties(), ...values.headers },
      body: JSON.stringify(values.data),
      ...values.init,
    });

    return response;
  }

  async PostWithFormData(values: {
    input?: RequestInfo;
    data?: FormData;
    headers?: HeadersInit;
    init?: Omit<RequestInit | undefined, "body">;
  }): Promise<Response> {
    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "POST",
      headers: { ...values.headers },
      body: values.data,
      ...values.init,
    });

    return response;
  }

  async Put(values: {
    input?: RequestInfo;
    data?: any;
    headers?: HeadersInit;
    init?: Omit<RequestInit | undefined, "body">;
  }): Promise<Response> {
    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "PUT",
      headers: {
        ...this.HeaderProperties(),
        ...values.headers,
      },
      body: JSON.stringify(values.data),
      ...values.init,
    });

    return response;
  }

  async Delete(values: { input?: RequestInfo; headers?: HeadersInit }): Promise<Response> {
    const response = await this.CustomFetch(`${this._url}${values.input}`, {
      method: "DELETE",
      headers: {
        ...this.HeaderProperties(),
        ...values.headers,
      },
    });

    return response;
  }

  /**
   * Burada bir fetch işlemi gerçekleştirilmekte fakat farklı olarak burayı `interceptor` olarak kullanmaktayız.
   * @param input
   * @param init
   * @returns
   */
  private async CustomFetch(input: RequestInfo, init?: RequestInit | undefined): Promise<Response> {
    try {
      // # Request Interceptor

      const request = await fetch(input, init);

      // # Response Interceptor

      // Error Handling
      if (!request.ok) {
        switch (request.status) {
          case 400:
            console.error("400");
            break;
          case 401:
            console.error("401");
            break;
          case 404:
            console.error("404");
            break;
          default:
            break;
        }
      }

      // Return
      return request;
    } catch (error) {
      throw error;
    }
  }

  private HeaderProperties = (): HeadersInit => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(this._token && { Authorization: `Bearer ${this._token}` }),
    };
  };
}

export default Api;
