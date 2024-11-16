/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Urbanist",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: ["JetBrains Mono", "ui-serif", "serif"],
      },
      colors: {
        //primary: "#CCD5AE", // Sötétebb pasztell szín
        pastel: "#dbcc79",
        //secondary: "#E9EDC9", // Világosabb pasztell szín
        // background: "#FEFAE0", // Fő háttér
        //accent: "#FAEDCD", // Egyéb kiegésziítő szín
        muted: "#D4A373", // Egy sötétebb, pasztell szín
        nav_bg: "rgba(255, 255, 255, 0.02)",
        background: "#FFFBEA", // Nagyon halvány sárga
        primary: "#F4E3C3", // Lágy sárgás-bézs a kiemeléshez
        secondary: "#FFFDF5", // Szinte fehér, enyhe sárga tónussal
        accent: "#E8DCC5", // Halvány bézs
        textColor: "#5A5A5A", // Lágyabb, közepes szürke
      },
      backgroundImage: {
        "gradient-pastel":
          "linear-gradient(135deg, bg-primary, bg-accent 50%, bg-muted)",
        "gradient-two-tone":
          "linear-gradient(135deg, bg-primary, bg-secondary)",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      white: "#ffffff", // Fő háttér fehér
    }),
  },
  plugins: [],
};
