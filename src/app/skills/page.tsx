"use client";

import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";
import MainLayout from "@/components/layout/MainLayout";
import { useInView } from "react-intersection-observer";



const frontendSkills = [
	{
		name: "HTML",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "CSS",
		isActive: true,
		term: "3 years",
	},
	{
		name: "Sass",
		isActive: false,
		term: "5 months",
	},
	{
		name: "JavaScript",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "TypeScript",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "React",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Next.js",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Tailwind CSS",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Ant Design",
		isActive: true,
		term: "2 year",
		goodAt: true,
	},
];

const mobileSkills = [
	{
		name: "React Native",
		isActive: true,
		term: "1 year",
		goodAt: true,
	},
	{
		name: "Flutter",
		isActive: false,
		term: "1 year",
	},
];

const backendSkills = [
	{
		name: "Go",
		isActive: true,
		term: "6 months",
	},
	{
		name: "AWS",
		isActive: true,
		term: "2 years",
	},
];

const toolsSkils = [
	{
		name: "Git",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "GitHub",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Docker",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Cursor",
		isActive: true,
		term: "1 years",
		goodAt: true,
	},
	{
		name: "Neovim",
		isActive: true,
		term: "1 years",
		goodAt: true,
	},
	{
		name: "VSCode",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
];

const communicationSkills = [
	{
		name: "Slack",
		isActive: true,
		term: "3 years",
	},
	{
		name: "Discord",
		isActive: true,
		term: "3 years",
	},
	{
		name: "Zoom",
		isActive: true,
		term: "3 years",
	},
	{
		name: "Google Meet",
		isActive: true,
		term: "3 years",
	},
];

const robotSkills = [
	{
		name: "Python",
		isActive: false,
		term: "3 years",
		goodAt: true,
	},
	{
		name: "Raspberry Pi",
		isActive: false,
		term: "3 years",
	},
	{
		name: "ROS",
		isActive: false,
		term: "3 years",
	},
	{
		name: "TurtleBot",
		isActive: false,
		term: "2 years",
	},
	{
		name: "Arduino",
		isActive: false,
		term: "2 years",
	},
];

const otherSkills = [
	{
		name: "C",
		isActive: false,
		term: "2 years",
	},
	{
		name: "Linux",
		isActive: true,
		term: "3 years",
		goodAt: true,
	},
];

const SkillsPage = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<MainLayout>
			<div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold text-center mb-8">Skills</h1>
				<div
					ref={ref}
					className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
						inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}
				>
					{[
						{ title: "Frontend", skills: frontendSkills },
						{ title: "Mobile", skills: mobileSkills },
						{ title: "Tools", skills: toolsSkils },
						{ title: "Communication", skills: communicationSkills },
						{ title: "Robot", skills: robotSkills },
						{ title: "Other", skills: otherSkills },
						{ title: "Backend", skills: backendSkills },
					].map((section, index) => (
						<div
							key={section.title}
							className={"transition-all duration-500"}
							style={{
								transitionDelay: `${index * 200}ms`,
								opacity: inView ? 1 : 0,
								transform: inView ? "translateY(0)" : "translateY(20px)",
							}}
						>
							<SkillsSection title={section.title} skills={section.skills} />
						</div>
					))}
				</div>
			</div>
			<Footer />
		</MainLayout>
	);
};

export default SkillsPage;
