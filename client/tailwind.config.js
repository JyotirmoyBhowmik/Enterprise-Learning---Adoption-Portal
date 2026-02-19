/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // Preply inspired aesthetic: Clean whites, cool grays, vibrant primary
                lumina: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6', // Primary Teal
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                surface: {
                    DEFAULT: '#ffffff',
                    muted: '#f8fafc', // Very subtle gray for background
                    border: '#e2e8f0',
                },
                text: {
                    DEFAULT: '#0f172a',
                    muted: '#64748b',
                }
            },
        },
    },
    plugins: [],
}
