class Api {
  private _host?: string;
  private _core?: string;

  constructor(values: { host?: string; core?: string }) {
    this._host = values.host || window.location.origin;
    this._core = values.core || "";
  }

  async Get<T>(values: { input?: RequestInfo | undefined; headers?: HeadersInit }): Promise<T> {
    const request = await this.CustomFetch(
      `${this._host}/${this._core ? this._core + "/" : ""}${values.input}`,
      {
        headers: {
          ...this.HeaderProperties,
          ...values.headers,
        },
        method: "GET",
      }
    );

    return await request.json();
  }

  async Post<T>(values: { input?: RequestInfo; data: any; headers?: HeadersInit }): Promise<T> {
    const request = await this.CustomFetch(
      `${this._host}/${this._core ? this._core + "/" : ""}${values.input}`,
      {
        headers: { ...this.HeaderProperties, ...values.headers },
        method: "POST",
        body: JSON.stringify(values.data),
      }
    );

    return await request.json();
  }

  async Put<T>(values: { input?: RequestInfo; data?: any; headers?: HeadersInit }): Promise<T> {
    const request = await this.CustomFetch(
      `${this._host}/${this._core ? this._core + "/" : ""}${values.input}`,
      {
        headers: {
          ...this.HeaderProperties,
          ...values.headers,
        },
        method: "PUT",
        body: JSON.stringify(values.data),
      }
    );

    return await request.json();
  }

  async Delete<T>(values: { input?: RequestInfo; headers?: HeadersInit }): Promise<T> {
    const request = await this.CustomFetch(
      `${this._host}/${this._core ? this._core + "/" : ""}${values.input}`,
      {
        headers: {
          ...this.HeaderProperties,
          ...values.headers,
        },
        method: "DELETE",
      }
    );

    return await request.json();
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

  private HeaderProperties: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export default Api;
