const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Prefijo para las peticiones a la API (ej: /api/pokemon)
    createProxyMiddleware({
      target: 'https://pokeapi.co/api/v2', // La URL de la API
      changeOrigin: true, // Necesario para CORS
      pathRewrite: {
        '^/api': '', // Opcional: Elimina el prefijo /api de la URL de la petición
      },
    })
  );
};