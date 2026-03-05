"use client";
import dynamic from "next/dynamic";

const CareerPdfViewer = dynamic(() => import("@/components/CareerPdfViewer"), {
	ssr: false,
	loading: () => (
		<div className="flex flex-col items-center p-4 bg-gray-100">
			<p>PDFを読み込み中...</p>
		</div>
	),
});

const CareerPage = () => {
	return (
		<div className="flex flex-col items-center p-4 bg-gray-100">
			<CareerPdfViewer />
		</div>
	);
};

export default CareerPage;
