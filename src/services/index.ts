import config from './config';
import {
  EXTERNAL_URL,
  INTERNAL_URL,
  LOCALHOST_URL,
  SERVICES,
} from '../constants';
import { ServiceMap } from '../types';

const ExternalServiceMap: ServiceMap = {};
const LocalhostServiceMap: ServiceMap = {};
const InternalServiceMap: ServiceMap = {};
const CustomServiceMap: ServiceMap = {};

const { externalServices, localServices, internalServices, customServices } =
  config(SERVICES);

externalServices.forEach((service) => {
  ExternalServiceMap[service] = EXTERNAL_URL.replace(
    '{{PORT}}',
    service.split(':')[1] ?? '3333',
  );
});

localServices.forEach((service) => {
  LocalhostServiceMap[service] = LOCALHOST_URL.replace(
    '{{PORT}}',
    service.split(':')[1] ?? '3333',
  );
});

internalServices.forEach((service) => {
  InternalServiceMap[service] = INTERNAL_URL.replace(
    '{{PORT}}',
    service.split(':')[1] ?? '3333',
  );
});

customServices.forEach(([service, url]) => {
  CustomServiceMap[service] = url;
});

export const PROXIES = Object.entries(LocalhostServiceMap)
  .concat(Object.entries(ExternalServiceMap))
  .concat(Object.entries(InternalServiceMap))
  .concat(Object.entries(CustomServiceMap))
  .map(([param, value]) => [param.split(':')[0], value]);
