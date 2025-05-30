"use server";

import Footer from "@/components/Footer";
import MainLayout from "@/components/layout/MainLayout";
import { getMarkdownContent } from "@/utils/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AboutPage = () => {
	const { content } = getMarkdownContent("about", "profile.md");

	return (
		<MainLayout>
			<div className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<article className="prose prose-invert prose-lg">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
					</article>
				</div>
			</div>
			<Footer />
		</MainLayout>
	);
};

export default AboutPage;
