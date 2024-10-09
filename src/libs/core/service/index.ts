import Api from "./Api";

class Service {
  private _api: Api;
  private _endPoint: string;

  constructor(values: { host?: string; core?: string; endPoint: string }) {
    this._api = new Api({ host: values.host, core: values.core });
    this._endPoint = values.endPoint;
  }

  async Get<T>(values?: { input?: string; headers?: HeadersInit | undefined }): Promise<T> {
    let endPoint: string = `${this._endPoint}`;

    if (values?.input) endPoint += `/${values.input}`;

    return await this._api.Get<T>({
      input: endPoint,
      headers: values?.headers,
    });
  }

  async Post<T, TData>(values?: {
    input?: RequestInfo;
    data: TData;
    headers?: HeadersInit;
  }): Promise<T> {
    let endPoint: string = `${this._endPoint}`;

    if (values?.input) endPoint += `/${values.input}`;

    return await this._api.Post<T>({
      input: endPoint,
      data: values?.data,
      headers: values?.headers,
    });
  }

  async Put<T, TData>(values?: {
    input?: RequestInfo;
    data?: TData;
    headers?: HeadersInit;
  }): Promise<T> {
    let endPoint: string = `${this._endPoint}`;

    if (values?.input) endPoint += `/${values.input}`;

    return await this._api.Put<T>({
      input: endPoint,
      data: values?.data,
      headers: values?.headers,
    });
  }

  async Delete<T>(values?: { input?: RequestInfo; headers?: HeadersInit }): Promise<T> {
    let endPoint: string = `${this._endPoint}`;

    if (values?.input) endPoint += `/${values.input}`;

    return await this._api.Delete<T>({
      input: endPoint,
      headers: values?.headers,
    });
  }
}

export default Service;
