"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AboutContentProps {
	jaContent: string;
	enContent: string;
}

const AboutContent = ({ jaContent, enContent }: AboutContentProps) => {
	const [language, setLanguage] = useState<"ja" | "en">("en");
	const [isChanging, setIsChanging] = useState(false);

	const handleLanguageChange = (newLanguage: "ja" | "en") => {
		if (newLanguage === language || isChanging) return;

		setIsChanging(true);
		setTimeout(() => {
			setLanguage(newLanguage);
			setTimeout(() => {
				setIsChanging(false);
			}, 50);
		}, 300);
	};

	const content = language === "ja" ? jaContent : enContent;

	return (
		<>
			<LanguageSwitcher
				onLanguageChange={handleLanguageChange}
				currentLanguage={language}
			/>
			<article
				className={`prose prose-invert prose-lg max-w-none transition-all duration-300 ${
					isChanging ? "opacity-0 scale-95" : "opacity-100 scale-100"
				}`}
			>
				<div className="mb-6">
					<Link href="/api/career" className="inline-flex" download>
						<span>
							{language === "ja"
								? "職務経歴書をダウンロード (PDF)"
								: "Download Career Sheet (PDF)"}
						</span>
					</Link>
				</div>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
			</article>
		</>
	);
};

export default AboutContent;
