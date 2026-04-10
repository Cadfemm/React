/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        clinical: {
          bg:     "#f0f4f8",
          card:   "#ffffff",
          border: "#e2e8f0",
          muted:  "#64748b",
          text:   "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.10)",
        modal: "0 20px 60px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
  // Don't purge Bootstrap or existing CSS
  corePlugins: {
    preflight: false,
  },
};
