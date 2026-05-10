const asciiG = [
	"   ▄████████▄  ",
	"  ███▀    ▀███ ",
	" ██▀         ▀ ",
	" ██            ",
	" ██     ▄████▄ ",
	" ██     ▀▀ ██▌ ",
	" ██▄        ██ ",
	"  ███▄▄  ▄▄███ ",
	"   ▀████████▀  ",
];

const gColors = [
	"#ff5f56",
	"#ff9f43",
	"#ffd23f",
	"#3fb950",
	"#3fd0d0",
	"#58a6ff",
	"#a371f7",
	"#f778ba",
	"#ff5f56",
];

const Row = ({
	label,
	value,
	href,
}: {
	label: string;
	value: string;
	href?: string;
}) => (
	<div className="flex">
		<span className="text-[#58a6ff] font-bold">{label}</span>
		<span className="text-[#c9d1d9]">: </span>
		{href ? (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-[#c9d1d9] underline decoration-dotted underline-offset-2 hover:text-[#58a6ff] print:no-underline print:text-[#c9d1d9]"
			>
				{value}
			</a>
		) : (
			<span className="text-[#c9d1d9]">{value}</span>
		)}
	</div>
);

const paletteDots = [
	"#1f2428",
	"#ff5f56",
	"#3fb950",
	"#ffd23f",
	"#58a6ff",
	"#a371f7",
	"#3fd0d0",
	"#c9d1d9",
];

const BusinessCard = () => {
	return (
		<div
			className="
				min-h-screen w-full flex items-center justify-center bg-neutral-800 p-6
				print:bg-white print:p-0 print:min-h-0 print:items-start print:justify-start
			"
		>
			<div
				className="
					w-[70vw] aspect-[91/55] max-h-[80vh]
					bg-[#0d1117] rounded-md shadow-2xl overflow-hidden flex
					print:w-[91mm] print:h-[55mm] print:max-h-none print:aspect-auto
					print:rounded-none print:shadow-none
				"
				style={{
					containerType: "inline-size",
					fontFamily:
						"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
					WebkitPrintColorAdjust: "exact",
					printColorAdjust: "exact",
				}}
			>
				<div className="flex flex-col justify-center pl-[3.5cqw] pr-[2.3cqw] py-[2.3cqw] leading-[1.05] text-[2.3cqw]">
					{asciiG.map((line, i) => (
						<pre
							// biome-ignore lint/suspicious/noArrayIndexKey: static ascii art
							key={i}
							className="m-0"
							style={{ color: gColors[i % gColors.length] }}
						>
							{line}
						</pre>
					))}
				</div>

				<div className="flex-1 flex flex-col justify-center pr-[3.5cqw] py-[2.3cqw] text-[2.6cqw] leading-[1.35]">
					<div className="flex">
						<span className="text-[#3fb950] font-bold">haruki</span>
						<span className="text-[#c9d1d9]">@</span>
						<span className="text-[#58a6ff] font-bold">portfolio</span>
					</div>
					<div className="text-[#6e7681] tracking-tight">
						─────────────────────
					</div>
					<Row label="Name" value="後藤晴貴 / Haruki Goto" />
					<Row
						label="GitHub"
						value="H-goto16"
						href="https://github.com/H-goto16"
					/>
					<Row
						label="URL"
						value="haruki-goto.com"
						href="https://haruki-goto.com"
					/>

					<div className="flex gap-[0.9cqw] mt-[1.2cqw]">
						{paletteDots.map((c, i) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: static palette
								key={i}
								className="inline-block w-[2.1cqw] h-[2.1cqw] rounded-[1px]"
								style={{ backgroundColor: c }}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessCard;
