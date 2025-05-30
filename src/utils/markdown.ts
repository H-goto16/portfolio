import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const contentDirectory = path.join(process.cwd(), "src/content");

export function getMarkdownContent(directory: string, filename: string) {
	const fullPath = path.join(contentDirectory, directory, filename);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return {
		frontMatter: data,
		content,
	};
}
