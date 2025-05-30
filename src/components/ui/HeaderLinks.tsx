import Link from "next/link";

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
	return (
		<nav
			className={`${isHome ? "absolute" : "fixed"} top-0 left-0 w-full z-50`}
		>
			<div
				className={
					!isHome ? "backdrop-blur-md bg-black/30 border-b border-white/10" : ""
				}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-end h-20 gap-8">
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
		</nav>
	);
};

export default HeaderLinks;
