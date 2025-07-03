/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      background: { DEFAULT: "#0D0E1C", light: "#F3EAFF" },
      "blue-bell-500": "#8f8fb7",
      "grey-50": "#FAFAFA80",
      section: { DEFAULT: "#D3D1F5", light: "#130F28" },
      card: { DEFAULT: "#090522", light: "#FFFFFF" },
      primary: "white",
      "geyser-200": "#ced8e1",
      "rob-roy-300": "#f0c777",
    },
    extend: {
      backgroundImage: {
        "5-color-gradient":
          "linear-gradient(to right, rgba(122, 91, 46, 0.50) 0%, rgba(191, 155, 103, 0.50) 23.23%, rgba(255, 255, 255, 0.50) 50.56%, rgba(191, 155, 103, 0.50) 75.59%, rgba(122, 91, 46, 0.50) 100.12%)",
      },
      boxShadow: {
        md: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        sir: "2px 4px 10px rgba(0, 0, 0, 0.5)",
        section: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
      },
      blur: {
        "12px": "12px",
      },
      fontSize: {
        sm: "0.875rem",
        md: "1.125rem",
        lg: "1.5rem",
        xl: "2rem",
        "1/2xl": "2.5rem",
        "2xl": "3rem",
        "3xl": "3.5rem",
        "4xl": "4rem",
      },
      maxWidth: {
        md: "24.75rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        geist: ["var(--font-geist-sans)"],
      },
    },
  },
};
