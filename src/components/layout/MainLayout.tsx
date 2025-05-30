import type { ReactNode } from "react";
import HeaderLinks from "../ui/HeaderLinks";

interface MainLayoutProps {
	children: ReactNode;
	isHome?: boolean;
}

const MainLayout = ({ children, isHome = false }: MainLayoutProps) => {
	return (
		<div className="min-h-screen bg-black text-white">
			{!isHome && <HeaderLinks />}
			<main className={isHome ? "" : "pt-20"}>{children}</main>
		</div>
	);
};

export default MainLayout;
