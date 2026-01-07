/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  theme: {
    colors: {
      // Core colors
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",

      // Gentleman's club palette - rich, warm, sophisticated
      background: {
        DEFAULT: "#1A1612",    // Rich dark brown (wood paneling)
        darker: "#110E0B",     // Deep shadow
        elevated: "#241F1A",   // Raised surfaces (leather)
      },

      // Amber gold - fireplace glow, chandelier warmth
      accent: {
        DEFAULT: "#D4A44C",    // Warm amber gold
        hover: "#E8B85A",      // Brighter gold
        muted: "rgba(212, 164, 76, 0.2)",
      },

      // Forest green - leather chair accent
      green: {
        DEFAULT: "#2D4A3E",    // Deep forest green
        light: "#3D6454",      // Lighter green
        muted: "rgba(45, 74, 62, 0.3)",
      },

      // Burgundy - Persian rug, warm accent
      burgundy: {
        DEFAULT: "#722F37",    // Wine red
        light: "#8B3D47",      // Lighter burgundy
        muted: "rgba(114, 47, 55, 0.25)",
      },

      // Warm wood tones
      wood: {
        DEFAULT: "#5C4033",    // Medium wood
        light: "#8B6914",      // Light oak
        dark: "#3D2B1F",       // Dark mahogany
      },

      // Gold for special highlights (logo, key CTAs)
      gold: {
        DEFAULT: "#D4A44C",    // Warm amber
        bright: "#F0C87C",     // Bright gold
        muted: "rgba(212, 164, 76, 0.15)",
      },

      // Legacy purple (keeping for compatibility)
      purple: {
        DEFAULT: "#8B5CF6",
        light: "#A78BFA",
        dark: "#6D28D9",
        muted: "rgba(139, 92, 246, 0.15)",
      },

      // Card backgrounds
      card: {
        DEFAULT: "#241F1A",    // Rich leather brown
        hover: "#2E2620",
      },

      // Text hierarchy - warm cream tones
      text: {
        primary: "#F5EDE4",    // Warm cream
        secondary: "#B8A99A",  // Muted tan
        muted: "#7A6B5D",      // Deep muted brown
      },

      // Borders - subtle warm
      border: {
        DEFAULT: "rgba(212, 164, 76, 0.12)",
        light: "rgba(212, 164, 76, 0.25)",
      },

      // Muted (legacy support)
      muted: {
        DEFAULT: "rgba(184, 169, 154, 0.6)",
        light: "rgba(184, 169, 154, 0.3)",
      },

      // Legacy colors (keeping for backward compatibility)
      section: { DEFAULT: "#D3D1F5", light: "#130F28" },
      primary: "white",
      "blue-bell-500": "#8f8fb7",
      "grey-50": "#FAFAFA80",
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
        "5xl": "4.5rem",   // Hero headline desktop
        "6xl": "5rem",     // Extra large
        "hero": "clamp(2.5rem, 8vw, 5rem)", // Responsive hero
      },
      lineHeight: {
        hero: "1.1",       // Tight line height for hero
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
