module.exports = {
  darkMode: "class", // O 'media' si prefieres que se base en la configuración del sistema
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#2d3748", // Puedes personalizar los colores del fondo
        "dark-text": "#e2e8f0", // Y los colores de texto para modo oscuro
      },
    },
  },
  plugins: [],
};
