import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		const { name, email, message } = await req.json();
		const user = process.env.MAIL_ACCOUNT;
		const pass = process.env.MAIL_PASSWORD;

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: user,
				pass: pass,
			},
		});

		const mailOptions = {
			from: email,
			to: user,
			subject: `Contact from ${name}`,
			text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
			html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<br>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `,
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Failed to send email:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}
}
