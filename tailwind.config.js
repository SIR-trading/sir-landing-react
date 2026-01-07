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
        light: "#F3EAFF",      // Light mode (legacy)
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
        light: "#FFFFFF",
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
      // colors: {
      //   background: "#0D0E1C",
      //   "grey-50": "#FAFAFA80",
      //   section: "#9A95E3",
      //   card: "#090522",
      //   primary: "white",
      //   gray: "cool",
      //   "dark-gray": "#0A0A0F",
      //   "mid-gray": "#25213C",
      //   "soft-gray": "#414158",
      //   cyan: "#26DEC8",
      //   "red-accent": "rgba(252, 165, 165, 1)",
      //   "gradient-start": "rgba(122, 91, 46, 0.5)",
      //   "gradient-mid": "rgba(191, 155, 103, 0.5)",
      //   "gradient-end": "rgba(255, 255, 255, 0.5)",
      //   geyser: {
      //     50: "#f5f7f9",
      //     100: "#e8edf1",
      //     200: "#ced8e1",
      //     300: "#bbc9d5",
      //     400: "#9aaec0",
      //     500: "#8197b0",
      //     600: "#6f83a1",
      //     700: "#637392",
      //     800: "#556078",
      //     900: "#475061",
      //     950: "#2e323d",
      //   },
      //   harlequin: {
      //     50: "#eeffe4",
      //     100: "#d9ffc4",
      //     200: "#b5ff90",
      //     300: "#85ff50",
      //     400: "#4bff0a",
      //     500: "#37e600",
      //     600: "#27b800",
      //     700: "#1d8b00",
      //     800: "#1c6d07",
      //     900: "#1a5c0b",
      //     950: "#073400",
      //   },
      //   "sea-buckthorn": {
      //     50: "#fef8ec",
      //     100: "#fde9c8",
      //     200: "#fad18d",
      //     300: "#f7b452",
      //     400: "#f69f36",
      //     500: "#ef7511",
      //     600: "#d4540b",
      //     700: "#b0380d",
      //     800: "#8f2b11",
      //     900: "#752512",
      //     950: "#431005",
      //   },
      //   green: {
      //     50: "#f1fcfa",
      //     100: "#cff8ee",
      //     200: "#9ff0dd",
      //     300: "#67e1ca",
      //     400: "#37cab2",
      //     500: "#1eae99",
      //     600: "#15897b",
      //     700: "#157066",
      //     800: "#165953",
      //     900: "#174a45",
      //     950: "#072c2a",
      //   },
      //   "gray-suit": {
      //     50: "#f5f6f8",
      //     100: "#edeef2",
      //     200: "#dedfe7",
      //     300: "#c9cbd8",
      //     400: "#b6b6c9",
      //     500: "#9f9eb6",
      //     600: "#8c88a3",
      //     700: "#79758d",
      //     800: "#636073",
      //     900: "#52515e",
      //     950: "#302f37",
      //   },
      //   "blue-bell": {
      //     50: "#f8f9fa",
      //     100: "#f1f2f6",
      //     200: "#e5e6ef",
      //     300: "#d0d1e2",
      //     400: "#b5b6d0",
      //     500: "#8f8fb7",
      //     600: "#817ea9",
      //     700: "#6f6b96",
      //     800: "#5c597e",
      //     900: "#4d4a68",
      //     950: "#313045",
      //   },
      //   "black-russian": {
      //     50: "#e9edff",
      //     100: "#d7dfff",
      //     200: "#b7c3ff",
      //     300: "#8c9aff",
      //     400: "#5e64ff",
      //     500: "#443aff",
      //     600: "#3718ff",
      //     700: "#300ef4",
      //     800: "#280fc4",
      //     900: "#25169966",
      //     950: "#090522",
      //   },
      //   "rob-roy": {
      //     50: "#fdf8ed",
      //     100: "#f9ebcc",
      //     200: "#f3d694",
      //     300: "#f0c777",
      //     400: "#e9a436",
      //     500: "#e1851f",
      //     600: "#c76418",
      //     700: "#a54618",
      //     800: "#873719",
      //     900: "#6f2e18",
      //     950: "#3f1609",
      //   },
      //   cameo: {
      //     50: "#faf6f2",
      //     100: "#f3ebe1",
      //     200: "#e5d4c3",
      //     300: "#cdaa89",
      //     400: "#c39674",
      //     500: "#b77d58",
      //     600: "#a96a4d",
      //     700: "#8d5541",
      //     800: "#72473a",
      //     900: "#5d3b31",
      //     950: "#311d19",
      //   },
      //   kumera: {
      //     50: "#f8f7ee",
      //     100: "#efedd2",
      //     200: "#e1daa7",
      //     300: "#cfc175",
      //     400: "#c0a94f",
      //     500: "#b19641",
      //     600: "#987836",
      //     700: "#7a5b2e",
      //     800: "#674b2c",
      //     900: "#59402a",
      //     950: "#332215",
      //   },
      //   twine: {
      //     50: "#f8f5ee",
      //     100: "#ede6d4",
      //     200: "#ddcdab",
      //     300: "#c9ac7b",
      //     400: "#bf9b67",
      //     500: "#a97e49",
      //     600: "#91653d",
      //     700: "#754c33",
      //     800: "#634030",
      //     900: "#56372d",
      //     950: "#311d17",
      //   },
      //   mercury: {
      //     50: "#f9f8f7",
      //     100: "#f1f0ef",
      //     200: "#eae7e6",
      //     300: "#d4cfcd",
      //     400: "#bbb1ae",
      //     500: "#a19692",
      //     600: "#897d79",
      //     700: "#726763",
      //     800: "#605754",
      //     900: "#524c4a",
      //     950: "#2a2625",
      //   },
      // },
    },
  },
};
