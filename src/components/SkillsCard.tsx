const SkillsCard = ({
	skillName,
	isActive,
	term,
	goodAt,
}: {
	skillName: string;
	isActive: boolean;
	term: string;
	goodAt: boolean;
}) => {
	return (
		<div
			className={`
				bg-white/5 backdrop-blur-sm rounded-xl p-6
				transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl
				border ${goodAt ? "border-indigo-500/30" : "border-white/10"}
				${goodAt ? "bg-gradient-to-br from-white/5 to-indigo-500/5" : ""}
			`}
		>
			<div className="flex justify-between items-start mb-4">
				<div className="flex-grow">
					<div className="flex items-center gap-2">
						<h2
							className={`
							text-2xl font-bold
							${
								goodAt
									? "bg-gradient-to-r from-indigo-400 to-purple-400"
									: "bg-gradient-to-r from-white to-gray-400"
							}
							bg-clip-text text-transparent
						`}
						>
							{skillName}
						</h2>
						{goodAt && (
							<span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-xs font-medium">
								Expert
							</span>
						)}
					</div>
					<p className="text-gray-400 text-sm mt-1 font-medium">{term}</p>
				</div>
				<span
					className={`
						${
							isActive
								? "bg-green-500/10 text-green-400 border-green-500/20"
								: "bg-red-500/10 text-red-400 border-red-500/20"
						}
						px-3 py-1 rounded-full text-xs font-medium border
					`}
				>
					{isActive ? "Active" : "Inactive"}
				</span>
			</div>
		</div>
	);
};

export default SkillsCard;
