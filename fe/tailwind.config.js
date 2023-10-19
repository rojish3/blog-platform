/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#F5F5F5",
        "secondary-bg": "#ffffff",
        "primary-text": "#000000",
        "darkMode-bg": "#000000",
        "secondary-darkMode-bg": "#171717",
        "darkMode-text": "#ffffff",
        "title-color": "#e85a4f",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Add prose styles here
            h1: {
              // Styles for headers (h1)
              // Example styles:
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.bold"),
              marginBottom: theme("margin.4"),
            },
            // Add styles for other elements like h2, bold, italic, etc.
            // Example:
            strong: {
              fontWeight: theme("fontWeight.bold"),
            },
            em: {
              fontStyle: "italic",
            },
            u: {
              textDecoration: "underline",
            },
            s: {
              textDecoration: "line-through",
            },
            blockquote: {
              // Styles for blockquotes
              // Example styles:
              borderLeftWidth: theme("borderWidth.2"),
              borderColor: theme("colors.gray.600"),
              paddingLeft: theme("padding.4"),
              marginLeft: theme("margin.4"),
            },
            ul: {
              // Styles for unordered lists
              // Example styles:
              listStyleType: "disc",
              paddingLeft: theme("padding.4"),
            },
            ol: {
              // Styles for ordered lists
              // Example styles:
              listStyleType: "decimal",
              paddingLeft: theme("padding.4"),
            },
            a: {
              // Styles for links
              // Example styles:
              color: theme("colors.blue.500"),
              textDecoration: "underline",
            },
            img: {
              // Styles for images
              // Example styles:
              maxWidth: "100%",
              height: "auto",
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
