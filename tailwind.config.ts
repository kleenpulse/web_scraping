/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				shimmer: "shimmer 1.5s infinite",
				slideLeft: "slideLeft 1s ease forwards",
				slideDown: "slideDown 1s ease forwards",
				loadspin: "loadspin 1.5s linear infinite",
			},
			keyframes: {
				loadspin: {
					"100%": {
						transform: "rotate(360deg)",
					},
				},
				shimmer: {
					"100%": {
						transform: "translateX(100%)",
					},
				},
				slideLeft: {
					"50%": {
						opacity: "0.7",
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(0)",
						opacity: "1",
					},
				},
				slideDown: {
					"50%": {
						opacity: "0.7",
						transform: "translateY(50)",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
				fadeOut: {
					"50%": {
						opacity: "0.7",
						transform: "translateY(50)",
					},
					"100%": {
						transform: "translateY(0)",
						opacity: "1",
					},
				},
			},
			colors: {
				primary: {
					DEFAULT: "#FF26B9",
					orange: "#903AFF",
					green: "#3E9242",
				},
				secondary: "#282828",
				"gray-200": "#EAECF0",
				"gray-300": "#D0D5DD",
				"gray-500": "#667085",
				"gray-600": "#475467",
				"gray-700": "#344054",
				"gray-900": "#101828",
				"white-100": "#F4F4F4",
				"white-200": "#EDF0F8",
				"black-100": "#3D4258",
				"neutral-black": "#23263B",
			},
			boxShadow: {
				xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
			},
			maxWidth: {
				"10xl": "1440px",
			},
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				spaceGrotesk: ["Space Grotesk", "sans-serif"],
			},
			borderRadius: {
				10: "10px",
			},
		},
	},
	plugins: [],
};
