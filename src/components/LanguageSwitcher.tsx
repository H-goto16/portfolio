"use client";

interface LanguageSwitcherProps {
	onLanguageChange: (language: "ja" | "en") => void;
	currentLanguage: "ja" | "en";
}

const LanguageSwitcher = ({
	onLanguageChange,
	currentLanguage,
}: LanguageSwitcherProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onLanguageChange(e.target.value as "ja" | "en");
	};

	return (
		<div className="mb-8 flex justify-end">
			<div className="relative">
				<select
					value={currentLanguage}
					onChange={handleChange}
					className="appearance-none px-4 py-2 text-sm bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 shadow-lg shadow-black/20 font-medium min-w-[90px]"
				>
					<option value="en" className="bg-gray-900 text-white">
						EN
					</option>
					<option value="ja" className="bg-gray-900 text-white">
						JP
					</option>
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
					<svg
						className="fill-current h-3 w-3"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						aria-hidden="true"
					>
						<title>Dropdown arrow</title>
						<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default LanguageSwitcher;
