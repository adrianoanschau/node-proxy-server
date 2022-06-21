import minimist from 'minimist';
import { Args, OriginParam } from '../types';

const args = minimist(process.argv.slice(2)) as Args;
delete args['_'];

const env = {
  LOCAL_SERVICES: (process.env.LOCAL_SERVICES ?? '').split(','),
  EXTERNAL_SERVICES: (process.env.EXTERNAL_SERVICES ?? '').split(','),
};

function readServices(origin: OriginParam) {
  const localFilter = (param: string) => param === 'local' || param === 'l';
  const externalFilter = (param: string) =>
    param === 'external' || param === 'e';
  const filter = {
    local: localFilter,
    external: externalFilter,
  };
  const environmentVars = {
    local: env.LOCAL_SERVICES,
    external: env.EXTERNAL_SERVICES,
  };

  const services = Object.entries<string | string[]>(args)
    .filter(([param]) => filter[origin](param))
    .map(([, value]) => {
      if (!Array.isArray(value)) value = value.split(',');
      return value;
    })
    .flat()
    .concat(environmentVars[origin]);

  return services;
}

export default function config(services: string[]) {
  const customServices = services
    .filter((svc) => !!process.env[`SVC_${svc.toUpperCase()}`])
    .map((svc) => [svc, process.env[`SVC_${svc.toUpperCase()}`] ?? ''])
    .filter(([, value]) => Boolean(value));

  services = services.filter((svc) => !process.env[`SVC_${svc.toUpperCase()}`]);

  const { localServices, externalServices } = {
    localServices: readServices('local').filter((val) =>
      services.includes(val.split(':')[0]),
    ),
    externalServices: readServices('external').filter((val) =>
      services.includes(val.split(':')[0]),
    ),
  };

  const internalServices = services
    .map((service) => {
      if (localServices.map((s) => s.split(':')[0]).includes(service))
        return '';
      if (externalServices.map((s) => s.split(':')[0]).includes(service))
        return '';
      return service;
    })
    .filter(Boolean);

  return { localServices, externalServices, internalServices, customServices };
}
