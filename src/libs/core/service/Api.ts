class Api {
  private _host?: string;
  private _core?: string;
  private _token?: string;
  private _init?: RequestInit;
  private _url: string;

  constructor(values: { host?: string; core?: string; token?: string; init?: RequestInit }) {
    this._host = values.host || (typeof window !== "undefined" ? window.location.origin : "");
    this._core = values.core || "";
    this._token = values.token;
    this._init = values.init;

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
      headers: {
        ...this.HeaderProperties(),
        ...values.init?.headers,
      },
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
      headers: {
        ...this.HeaderProperties(),
        ...values.init?.headers,
      },
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
      headers: {
        ...this.HeaderProperties(),
        ...values.init?.headers,
      },
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
      headers: {
        ...this.HeaderProperties(),
        ...values.init?.headers,
      },
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
      headers: {
        ...this.HeaderProperties(),
        ...values.init?.headers,
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
  private async CustomFetch(input: RequestInfo, init: RequestInit): Promise<Response> {
    try {
      // # Request Interceptor

      console.log(init);
      console.log(this._init);

      const request = await fetch(input, { ...init, ...this._init });

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
