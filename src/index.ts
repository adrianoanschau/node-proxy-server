import express from 'express';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { HOST, PORT } from './constants';
import { PROXIES } from './services';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  console.log('[ON]');
  res.json({ status: 'ON' });
});

PROXIES.map(([path, target]) => {
  console.log({ path, target });
  return app.use(
    `/${path}`,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^/${path}`]: '',
      },
      onError: (error) => {
        console.log({ path, error });
      },
    }),
  );
});

app.listen(parseInt(`${PORT}`, 10), HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
