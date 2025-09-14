// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,ts,tsx}", "./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
    presets: [require("nativewind/preset")],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  "#f8fafc",
                    100: "#e2e8f0",
                    200: "#cbd5e1",
                    300: "#94a3b8",
                    400: "#64748b",
                    500: "#475569",
                    600: "#334155",
                    700: "#1e293b",
                    800: "#0f172a",
                    900: "#0a0f1a",
                    DEFAULT: "#475569",
                },

                secondary: {
                    50:  "#ecfeff",
                    100: "#cffafe",
                    200: "#a5f3fc",
                    300: "#67e8f9",
                    400: "#22d3ee",
                    500: "#06b6d4",
                    600: "#0891b2",
                    700: "#0e7490",
                    800: "#155e75",
                    900: "#164e63",
                    DEFAULT: "#06b6d4",
                },

                gray: {
                    50:  "#f9fafb",
                    100: "#f3f4f6",
                    200: "#e5e7eb",
                    300: "#d1d5db",
                    400: "#9ca3af",
                    500: "#6b7280",
                    600: "#4b5563",
                    700: "#374151",
                    800: "#1f2937",
                    900: "#111827",
                },

                background: { light: "#ffffff", dark: "#0f172a" },
                surface:    { light: "#f9fafb", dark: "#1e293b" },
                foreground: { light: "#111827", dark: "#f9fafb" },
                border:     { light: "#e5e7eb", dark: "#334155" },
                muted:      { light: "#f3f4f6", dark: "#1e293b" },

                success: "#22c55e",
                warning: "#facc15",
                danger:  "#ef4444",
                info:    "#0ea5e9",
            },
        },
    },
    plugins: [],
};
