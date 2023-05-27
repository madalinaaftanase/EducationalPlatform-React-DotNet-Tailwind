const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5055",
      changeOrigin: true,
    })
  );
  app.use(
    "/sendMail",
    createProxyMiddleware({
      target: "https://osdkt9tre1.execute-api.eu-central-1.amazonaws.com/dev",
      changeOrigin: true,
    })
  );
};
