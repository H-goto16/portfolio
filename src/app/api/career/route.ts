import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const filePath = path.join(process.cwd(), "public", "assets", "skills.pdf");
		const fileBuffer = await fs.readFile(filePath);

		return new NextResponse(new Uint8Array(fileBuffer), {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": 'attachment; filename="skills.pdf"',
			},
		});
	} catch (error) {
		return NextResponse.json({ error: "File not found" }, { status: 404 });
	}
}
