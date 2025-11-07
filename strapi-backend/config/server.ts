export default ({ env }) => ({
  host: '127.0.0.1', // force localhost
  port: 1337,
  url: 'http://localhost:1337', // force http
  admin: {
    serveAdminPanel: true,
    url: '/admin',
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
