import type { Config } from "tailwindcss"

const config = {
    darkMode: ["class", "dark"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(265, 89%, 78%)",
                    foreground: "hsl(0, 0%, 100%)",
                },
                secondary: {
                    DEFAULT: "hsl(240, 89%, 70%)",
                    foreground: "hsl(0, 0%, 100%)",
                },
                destructive: {
                    DEFAULT: "hsl(0, 84%, 60%)",
                    foreground: "hsl(0, 0%, 100%)",
                },
                muted: {
                    DEFAULT: "hsl(240, 5%, 64%)",
                    foreground: "hsl(240, 4%, 46%)",
                },
                accent: {
                    DEFAULT: "hsl(265, 89%, 78%)",
                    foreground: "hsl(0, 0%, 100%)",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                "pastel-purple": "#a78bfa",
                "pastel-blue": "#e0f2fe",
                "pastel-blue-dark": "#3b82f6",
                "pastel-pink": "#fbcfe8",
                "pastel-green": "#a7f3d0",
                "pastel-green-dark": "#10b981",
                "pastel-mint": "#a5f3fc",
                "pastel-gray": "#d1d5db",
                "pastel-gray-dark": "#6b7280",
                "pastel-dark": "#374151",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                xl: "1rem",
                "2xl": "1.5rem",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "pulse-opacity": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-opacity": "pulse-opacity 2s ease-in-out infinite",
                float: "float 6s ease-in-out infinite",
            },
            backdropFilter: {
                none: "none",
                blur: "blur(8px)",
            },
        },
    },
    plugins: [],
} satisfies Config

export default config

