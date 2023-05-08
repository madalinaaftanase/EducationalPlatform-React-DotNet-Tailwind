const config = {
  baseApiUrl: process.env.NODE_ENV == "development" ? "/api" : "https://platformaeducationala.azurewebsites.net",
};

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export default config;
export { currencyFormatter };
