"use client";

import MainLayout from "@/components/layout/MainLayout";
import type { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
	title: "Contact | Haruki Goto",
	description: "Haruki Gotoの連絡先ページです。",
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "https://haruki-goto.com/contact",
		title: "Contact | Haruki Goto",
		description: "Haruki Gotoの連絡先ページです。",
	},
};

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to send message");
			}

			setSubmitStatus({
				type: "success",
				message: "Message sent successfully!",
			});
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			setSubmitStatus({
				type: "error",
				message: "Failed to send message. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<MainLayout>
			<div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto">
					<h1 className="text-4xl font-bold text-center mb-8">Contact</h1>
					<div className="bg-zinc-900 p-6 rounded-lg shadow-xl">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium mb-2"
								>
									Name
								</label>
								<input
									type="text"
									id="name"
									placeholder="Taro Yamada"
									required
									className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium mb-2"
								>
									Email
								</label>
								<input
									type="email"
									placeholder="example@gmail.com"
									id="email"
									required
									className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-sm font-medium mb-2"
								>
									Message
								</label>
								<textarea
									id="message"
									placeholder="Enter your message here"
									required
									rows={5}
									className="w-full px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
								/>
							</div>
							{submitStatus.type && (
								<div
									className={`p-4 rounded-md ${
										submitStatus.type === "success"
											? "bg-green-900 text-green-200"
											: "bg-red-900 text-red-200"
									}`}
								>
									{submitStatus.message}
								</div>
							)}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
