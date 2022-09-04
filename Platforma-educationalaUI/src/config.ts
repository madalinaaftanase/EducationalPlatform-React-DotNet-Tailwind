const config = {
  baseApiUrl: "http://localhost:5055/api",
};

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export default config;
export { currencyFormatter };
