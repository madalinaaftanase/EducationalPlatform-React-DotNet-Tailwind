const config = {
  baseApiUrl: "https://platformaeducationala.azurewebsites.net/api",
};

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export default config;
export { currencyFormatter };
