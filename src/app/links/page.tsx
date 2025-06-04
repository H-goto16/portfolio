"use client";

import Footer from "@/components/Footer";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { FaCalculator, FaGithub } from "react-icons/fa";
import { SiQiita, SiWantedly, SiZenn } from "react-icons/si";
import { useInView } from "react-intersection-observer";

const delay = 200;



const LinksPage = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const links = [
		{
			name: "GitHub",
			url: "https://github.com/H-goto16",
			icon: FaGithub,
			color: "hover:text-[#2ea44f]",
		},
		{
			name: "Wantedly",
			url: "https://www.wantedly.com/id/haruki_goto",
			icon: SiWantedly,
			color: "hover:text-[#21bddb]",
		},
		{
			name: "Qiita",
			url: "https://qiita.com/H-goto16",
			icon: SiQiita,
			color: "hover:text-[#55c500]",
		},
		{
			name: "Zenn",
			url: "https://zenn.dev/h_goto16",
			icon: SiZenn,
			color: "hover:text-[#3ea8ff]",
		},
	];

	const workLinks = [
		{
			name: "mini4wd-calculator",
			url: "https://mini4wd-app.netlify.app/",
			icon: FaCalculator,
			color: "hover:text-[#2ea44f]",
		},
	];
	return (
		<MainLayout>
			<div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-center mb-12">Links</h1>
				<div
					ref={ref}
					className={`max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 transform ${
						inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
				>
					{links.map((link, index) => {
						const Icon = link.icon;
						return (
							<Link
								prefetch
								key={link.name}
								href={link.url}
								className={`group relative flex flex-col items-center justify-center p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50 ${
									link.color
								} ${
									inView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
								style={{
									transitionDelay: `${index * delay}ms`,
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
								<span className="text-lg font-medium">{link.name}</span>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-zinc-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Link>
						);
					})}
				</div>
				<h1 className="text-4xl font-bold text-center my-12">Works</h1>
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 transform">
					{workLinks.map((link, index) => {
						const Icon = link.icon;
						return (
							<Link
								prefetch
								key={link.name}
								href={link.url}
								className={`group relative flex flex-col items-center justify-center p-8 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50 ${
									link.color
								} ${
									inView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}`}
								style={{
									transitionDelay: `${links.length * delay + index * delay}ms`,
								}}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
								<span className="text-lg font-medium">{link.name}</span>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-zinc-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</Link>
						);
					})}
				</div>
			</div>
			<Footer />
		</MainLayout>
	);
};

export default LinksPage;
