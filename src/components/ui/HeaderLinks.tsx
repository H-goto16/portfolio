import Link from "next/link";

interface HeaderLink {
	text: string;
	href: string;
}

const links: HeaderLink[] = [
	{ text: "Home", href: "/" },
	{ text: "About", href: "/about" },
	{ text: "Projects", href: "/projects" },
	{ text: "Contact", href: "/contact" },
];

const HeaderLinks = () => {
	return (
		<nav className="fixed top-0 left-0 w-full  z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-end h-16 gap-8">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium relative group"
						>
							{link.text}
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default HeaderLinks;
