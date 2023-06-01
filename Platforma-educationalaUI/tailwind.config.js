module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        try: "url('https://images.squarespace-cdn.com/content/v1/5400aaffe4b0e55693c02162/1622153734965-AASUXJ2KDNXYABP2XE6A/COTK+Kids+Background.png?format=2500w')",
      },
      colors: {
        navbar: "#82C3EC",
        textColor: "#F9F5EB",
        orange: "#eb5353",
        navbarHover:'#39A2DB',
        mint: "#00FFD1",
        mintBlue: "#31C6D4",
      },
    },
  },
  plugins: [],
};
