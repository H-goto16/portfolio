"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CustomPdfViewer = () => {
	const [numPages, setNumPages] = useState<number>();

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	return (
		<div className="flex flex-col items-center p-4 bg-gray-100">
			<Document
				file="/api/career"
				onLoadSuccess={onDocumentLoadSuccess}
				loading={<p>PDFを読み込み中...</p>}
			>
				{Array.from(new Array(numPages), (el, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						className="mb-4 shadow-lg"
						renderTextLayer={false}
						renderAnnotationLayer={false}
					/>
				))}
			</Document>
		</div>
	);
};

export default CustomPdfViewer;
