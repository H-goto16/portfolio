"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderLink {
	text: string;
	href: string;
}

interface HeaderLinksProps {
	isHome?: boolean;
}

const links: HeaderLink[] = [
	{ text: "Home", href: "/" },
	{ text: "About", href: "/about" },
	{ text: "Skills", href: "/skills" },
	{ text: "Links", href: "/links" },
	{ text: "Contact", href: "/contact" },
];

const HeaderLinks = ({ isHome = false }: HeaderLinksProps) => {
	const [isOpen, setIsOpen] = useState(false);

	// メニューが開いているときはスクロールを無効化
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<>
			<nav
				className={`${isHome ? "absolute" : "fixed"} top-0 left-0 w-full z-50`}
			>
				<div
					className={
						!isHome
							? "backdrop-blur-md bg-black/30 border-b border-white/10"
							: ""
					}
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-end h-20">
							{/* ハンバーガーメニューボタン */}
							<button
								type="button"
								onClick={() => setIsOpen(!isOpen)}
								className="lg:hidden relative z-50 p-2"
								aria-label="Toggle menu"
							>
								<div className="w-6 h-4 relative flex flex-col justify-between">
									<span
										className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
											isOpen ? "rotate-45 translate-y-1.5" : ""
										}`}
									/>
									<span
										className={`w-full h-0.5 bg-white transition-all duration-300 ${
											isOpen ? "opacity-0" : ""
										}`}
									/>
									<span
										className={`w-full h-0.5 bg-white transform transition-all duration-300 ${
											isOpen ? "-rotate-45 -translate-y-1.5" : ""
										}`}
									/>
								</div>
							</button>

							{/* デスクトップメニュー */}
							<div className="hidden lg:flex items-center gap-8">
								{links.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className={`relative px-3 py-2 text-white/90 hover:text-white transition-colors duration-300 text-base font-medium tracking-wide group ${
											isHome ? "hover:text-white/90" : ""
										}`}
									>
										<span className="relative z-10">{link.text}</span>
										{!isHome && (
											<>
												<span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/10" />
												<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
											</>
										)}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</nav>

			{/* モバイルメニュー */}
			<div
				className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md transition-all duration-300 z-40 ${
					isOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 -translate-y-full pointer-events-none"
				}`}
			>
				<div className="flex flex-col items-center justify-center min-h-screen py-20 space-y-8">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className="text-white/90 hover:text-white text-2xl font-medium tracking-wide"
						>
							{link.text}
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default HeaderLinks;
