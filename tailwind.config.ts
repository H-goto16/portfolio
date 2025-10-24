import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			perspective: {
				"1000": "1000px",
				"2000": "2000px",
			},
			animation: {
				"flip-to-ja": "flipToJa 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
				"flip-to-en": "flipToEn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
				"button-pulse": "buttonPulse 0.6s ease-in-out",
			},
			keyframes: {
				flipToJa: {
					"0%": { transform: "rotateX(0deg)", opacity: "1" },
					"50%": { transform: "rotateX(-90deg)", opacity: "0.3" },
					"100%": { transform: "rotateX(-180deg)", opacity: "1" },
				},
				flipToEn: {
					"0%": { transform: "rotateX(-180deg)", opacity: "1" },
					"50%": { transform: "rotateX(-90deg)", opacity: "0.3" },
					"100%": { transform: "rotateX(0deg)", opacity: "1" },
				},
				buttonPulse: {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" },
				},
			},
			transformStyle: {
				"3d": "preserve-3d",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
} satisfies Config;
