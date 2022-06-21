export type Args = {
  ['_']: any;
  local?: string | string[];
  l?: string | string[];
  external?: string | string[];
  e?: string | string[];
};

export type ServiceMap = { [_: string]: string };

export type OriginParam = 'local' | 'external';
