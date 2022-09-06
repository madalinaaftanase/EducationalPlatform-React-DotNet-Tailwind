const swrConfig = {
  onError: (error, key) => {
    if (error.response.status === 500) {
      window.alert("Server Error. Please contact admin");
    }
    if (error.response.status === 400) {
      window.alert("400. Please contact admin");
    }
  },
};

module.exports = swrConfig;