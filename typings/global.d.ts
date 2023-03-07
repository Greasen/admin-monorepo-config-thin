declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare module 'postcss-px-to-viewport-8-plugin';

declare type stringKey = Record<string, string>

declare interface apiParma {
  [key: string]: string;
}

declare interface Window {
  NOTICE_CONFIG_: {
    [key: string]: any
  }
  SYSTEM_CONFIG_: any
  MozWebSocket: (...arg) => void | any
}

declare interface Process {
  NODE_ENV: any;
  env: {
    NODE_ENV: string | boolean | unknown | any
  }
}

declare interface ImportMetaExtend extends ImportMeta {
  title: string
}