export const HOST = process.env.HOST ?? '0.0.0.0';
export const PORT = process.env.PORT ?? '3000';
export const LOCALHOST_URL = 'http://0.0.0.0:{{PORT}}/graphql';
export const INTERNAL_URL = process.env.INTERNAL_URL ?? LOCALHOST_URL;
export const EXTERNAL_URL = process.env.EXTERNAL_URL ?? LOCALHOST_URL;
export const SERVICES = [
  'authentication',
  'authorization',
  'organizations',
  'practitioners',
  'patients',
  'exams',
  'notifications',
];
