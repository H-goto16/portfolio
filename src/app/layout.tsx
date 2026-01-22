import type { Metadata } from "next";
import {
	Inter,
	Montserrat,
	Noto_Sans_JP,
	Playfair_Display,
	Poppins,
	Roboto_Mono,
} from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
});

const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
});

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	variable: "--font-noto-sans-jp",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	variable: "--font-roboto-mono",
});

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: {
		default: "Haruki Goto | Portfolio",
		template: "%s | Haruki Goto",
	},
	description: "Haruki Gotoのポートフォリオサイト",
	keywords: [
		"portfolio",
		"developer",
		"web development",
		"frontend",
		"backend",
	],
	authors: [{ name: "Haruki Goto" }],
	creator: "Haruki Goto",
	icons: {
		icon: [
			{ url: "./favicon.ico" },
			{ url: "./favicon.ico", sizes: "16x16" },
			{ url: "./favicon.ico", sizes: "32x32" },
		],
		shortcut: "./favicon.ico",
		apple: "./favicon.ico",
	},
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "https://haruki-goto.com",
		title: "Haruki Goto | Portfolio",
		description: "Haruki Gotoのポートフォリオサイト",
		siteName: "Haruki Goto Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Haruki Goto | Portfolio",
		description: "Haruki Gotoのポートフォリオサイト",
	},
	robots: {
		index: true,
		follow: true,
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
	},
};

const RootLayout = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<html
			lang="ja"
			className={`${montserrat.variable} ${playfair.variable} ${notoSansJP.variable} ${inter.variable} ${robotoMono.variable} ${poppins.variable}`}
		>
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
