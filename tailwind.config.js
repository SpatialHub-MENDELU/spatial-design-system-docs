/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./.vitepress/**/*.html",
        "./src/**/*.{vue,js,ts,jsx,tsx,html}", 
    ],
    important: true,
    theme: {
        extend: {
            colors: {
                "border-color": "#e5e7eb",
                "dark-text": "#3c3c43",
                "primary": "#00ba92",
                "secondary": "#03fcc6",
                "tertiary": "#005f4c",
                "light-text": "#fcfcfc",
                "light-background": "#e2e2e3",
                "dark-background": "#4a4a4a",
                "light-primary": "#e6f8f4",
                "extra-light-background": "#F4F4F4",
                "grey": "#b7b4b4",
                "red": "#ba0013"
            },
        },
    },
    plugins: [],
};
