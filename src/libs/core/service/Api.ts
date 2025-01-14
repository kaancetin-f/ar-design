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
    if (values.input && values.input.toString().includes("?")) {
      values.input = values.input.toString().replace(/\/(?=\?)/, "");
    }

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

  private HeaderProperties = (): HeadersInit => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(this._token && { Authorization: `Bearer ${this.Cookies(this._token)}` }),
    };
  };

  private Cookies = (name: string) => {
    if (typeof window === "undefined") return undefined;

    const cookies = document.cookie.split("; ");
    const cookieObject: { key: string; value: string }[] = [];

    cookies.forEach((cookie) => {
      const [key, value] = cookie.split("=");
      cookieObject.push({ key: key, value: value });
    });

    return decodeURIComponent(cookieObject.find((x) => x.key === name)?.value ?? "");
  };

  /**
   * Burada bir fetch işlemi gerçekleştirilmekte fakat farklı olarak burayı `interceptor` olarak kullanmaktayız.
   * @param input
   * @param init
   * @returns
   */
  private async CustomFetch(input: RequestInfo, init: RequestInit | undefined): Promise<Response> {
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
            console.error(`Unexpected Error: ${request.status}`);
        }
      }

      // Return
      return request;
    } catch (error) {
      throw error;
    }
  }
}

export default Api;
