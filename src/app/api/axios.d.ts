import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipErrors?: boolean; // если передаем true - во время возникновения axios ошибки не рисуется toast с ошибкой
    skipAccessToken?: boolean; // если передаем true - AccessToken не передается в хедере
  }
}
