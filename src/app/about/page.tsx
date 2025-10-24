import AboutContent from "@/app/about/AboutContent";
import Footer from "@/components/Footer";
import MainLayout from "@/components/layout/MainLayout";
import { getMarkdownContent } from "@/utils/markdown";

const AboutPage = () => {
	const { content: jaContent } = getMarkdownContent("about", "profile.md");
	const { content: enContent } = getMarkdownContent("about", "profile.en.md");

	return (
		<MainLayout>
			<div className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<AboutContent jaContent={jaContent} enContent={enContent} />
				</div>
			</div>
			<Footer />
		</MainLayout>
	);
};

export default AboutPage;
