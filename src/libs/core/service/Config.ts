type RequestInterceptor = (input: RequestInfo, init: RequestInit) => Promise<[RequestInfo, RequestInit]>;
type ResponseInterceptor = (res: Response) => Promise<Response>;

export interface ApiConfig {
  headers?: HeadersInit;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;
}

// Başlangıç default config
let config: ApiConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

// Runtime (getter / setter)
export const getApiConfig = () => config;

export const setApiConfig = (newConfig: Partial<ApiConfig>) => {
  config = { ...config, ...newConfig };
};
