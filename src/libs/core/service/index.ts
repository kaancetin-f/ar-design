import Api from "./Api";

type Result<TResponse> = {
  response: TResponse;
  __ok__: boolean;
  __statusCode__: number;
  __statusText__: string;
};

class Service {
  private _api: Api;
  private _endPoint: string;

  constructor(values: { host?: string; core?: string; endPoint: string }) {
    this._api = new Api({ host: values.host, core: values.core });
    this._endPoint = values.endPoint;
  }

  async Get<TResponse>(values?: { input?: string; headers?: HeadersInit | undefined }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;

      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.Get({
        input: endPoint,
        headers: values?.headers,
      });
      const text = (await response.text()).trim();

      // JSON formatına dönüştürmeye çalış
      let data;
      try {
        data = JSON.parse(text); // Gelen veriyi JSON'a dönüştür
      } catch (error) {
        // JSON parse hatası durumunda, gelen veriyi başka şekilde işleyin
        console.error("Gelen veri JSON formatında değil:", text);
        data = null; // JSON geçerli değilse, data null olabilir veya başka bir işlem yapılabilir
      }

      return {
        response: data,
        __ok__: response.ok,
        __statusCode__: response.status,
        __statusText__: response.statusText,
      };
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
      const text = (await response.text()).trim();

      return {
        response: text.length > 0 ? JSON.parse(text) : null,
        __ok__: response.ok,
        __statusCode__: response.status,
        __statusText__: response.statusText,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async PostWithFormData<TResponse, TData>(values?: {
    input?: RequestInfo;
    data?: TData;
    headers?: HeadersInit;
    init?: RequestInit | undefined;
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
      const text = (await response.text()).trim();

      // JSON formatına dönüştürmeye çalış
      let data;
      try {
        data = JSON.parse(text); // Gelen veriyi JSON'a dönüştür
      } catch (error) {
        // JSON parse hatası durumunda, gelen veriyi başka şekilde işleyin
        console.error("Gelen veri JSON formatında değil:", text);
        data = null; // JSON geçerli değilse, data null olabilir veya başka bir işlem yapılabilir
      }

      return {
        response: data,
        __ok__: response.ok,
        __statusCode__: response.status,
        __statusText__: response.statusText,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }

  async Put<TResponse, TData>(values?: {
    input?: RequestInfo;
    data?: TData;
    headers?: HeadersInit;
  }): Promise<Result<TResponse>> {
    try {
      let endPoint: string = `${this._endPoint}`;

      if (values?.input) endPoint += `/${values.input}`;

      const response = await this._api.Put({
        input: endPoint,
        data: values?.data,
        headers: values?.headers,
      });
      const text = (await response.text()).trim();

      return {
        response: text.length > 0 ? JSON.parse(text) : null,
        __ok__: response.ok,
        __statusCode__: response.status,
        __statusText__: response.statusText,
      };
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
      const text = (await response.text()).trim();

      return {
        response: text.length > 0 ? JSON.parse(text) : null,
        __ok__: response.ok,
        __statusCode__: response.status,
        __statusText__: response.statusText,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.");
    }
  }
}

export default Service;
