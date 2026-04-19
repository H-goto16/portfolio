import path from "node:path";
import { fileURLToPath } from "node:url";
import { mdToPdf } from "md-to-pdf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.resolve(__dirname, "../public/assets/skills.md");
const outputPath = path.resolve(__dirname, "../public/assets/skills.pdf");

const pdf = await mdToPdf(
	{ path: inputPath },
	{
		dest: outputPath,
		pdf_options: {
			format: "A4",
			margin: { top: "20mm", bottom: "20mm", left: "20mm", right: "20mm" },
			printBackground: true,
		},
		stylesheet_encoding: "utf-8",
		css: `
      body {
        font-family: "Hiragino Kaku Gothic Pro", "Noto Sans JP", "Meiryo", sans-serif;
        font-size: 11px;
        line-height: 1.7;
        color: #1a1a1a;
      }
      h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 4px; }
      h2 { font-size: 15px; border-bottom: 1px solid #aaa; padding-bottom: 2px; margin-top: 20px; }
      h3 { font-size: 13px; margin-top: 16px; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; }
      th, td { border: 1px solid #ccc; padding: 5px 8px; text-align: left; }
      th { background-color: #f0f0f0; }
      hr { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
      ul { padding-left: 18px; }
      li { margin: 2px 0; }
    `,
	},
);

if (pdf.filename) {
	console.log(`PDF generated: ${pdf.filename}`);
} else {
	console.error("Failed to generate PDF");
	process.exit(1);
}
