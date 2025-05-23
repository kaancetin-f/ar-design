import Api from "./Api";

export type Result<TResponse> = {
  response: TResponse;
  __response__: Promise<Response> | null;
  __ok__: boolean;
  __statusCode__: number;
  __statusText__: string;
};

class Service {
  private _api: Api;
  private _endPoint?: string;

  constructor(values: { host?: string; core?: string; endPoint?: string; token?: string }) {
    this._api = new Api({ host: values.host, core: values.core, token: values.token });
    this._endPoint = values.endPoint;
  }

  async Get<TResponse>(values?: { input?: string; headers?: HeadersInit | undefined }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;
      if (values?.input) endPoint += `/${values.input}`;

      const { p_response, response } = await this._api.Get({
        input: endPoint,
        headers: values?.headers,
      });

      return await this.Response(p_response, response);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async Post<TResponse, TData>(values?: {
    input?: RequestInfo;
    data?: TData;
    headers?: HeadersInit;
    init?: RequestInit | undefined;
  }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;
      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.Post({
        input: endPoint,
        data: values?.data,
        headers: values?.headers,
        init: values?.init,
      });

      return await this.Response(null, response);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async PostWithFormData<TResponse>(values?: {
    input?: RequestInfo;
    data?: FormData;
    headers?: HeadersInit;
    init?: Omit<RequestInit | undefined, "body">;
  }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;
      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.PostWithFormData({
        input: endPoint,
        data: values?.data,
        headers: values?.headers,
        init: values?.init,
      });

      return await this.Response(null, response);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async Put<TResponse, TData>(values?: {
    input?: RequestInfo;
    data?: TData;
    headers?: HeadersInit;
    init?: Omit<RequestInit | undefined, "body">;
  }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;
      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.Put({
        input: endPoint,
        data: values?.data,
        headers: values?.headers,
        init: values?.init,
      });

      return await this.Response(null, response);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async Delete<TResponse>(values?: { input?: RequestInfo; headers?: HeadersInit }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;
      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.Delete({
        input: endPoint,
        headers: values?.headers,
      });

      return await this.Response(null, response);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  private Response = async (p_response: Promise<Response> | null, response: Response) => {
    const text = (await response.text()).trim();
    let _response;

    try {
      _response = JSON.parse(text);
    } catch (error) {
      _response = text;
    }

    return {
      response: _response,
      __response__: p_response,
      __ok__: response.ok,
      __statusCode__: response.status,
      __statusText__: response.statusText,
    };
  };
}

export default Service;
