import SkillsCard from "./SkillsCard";

interface Skill {
	name: string;
	isActive: boolean;
	term: string;
	goodAt?: boolean;
}

interface SkillsSectionProps {
	title: string;
	skills: Skill[];
}

const SkillsSection = ({ title, skills }: SkillsSectionProps) => {
	return (
		<div className="bg-zinc-900 p-6 rounded-lg shadow-xl">
			<h2 className="text-2xl font-bold mb-4">{title}</h2>
			<ul className="space-y-4">
				{skills.map((skill) => (
					<SkillsCard
						key={skill.name}
						skillName={skill.name}
						isActive={skill.isActive}
						term={skill.term}
						goodAt={skill.goodAt || false}
					/>
				))}
			</ul>
		</div>
	);
};

export default SkillsSection;
