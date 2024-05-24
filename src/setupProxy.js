const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://new-arrow-backend.onrender.com/",
      changeOrigin: true,
    })
  );
};
