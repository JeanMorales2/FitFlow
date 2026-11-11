/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  corePlugins: {
    // FitFlow mantiene SCSS existente. La migración visual será incremental,
    // por lo que evitamos cambiar estilos base de la aplicación de golpe.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
