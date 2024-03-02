"use client";

import { ReactElement } from "react";
import PDF from "../PDF/PDF";
import useApp from "@/hooks/useApp";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import dynamic from "next/dynamic";
import { BsFileEarmarkArrowDown } from "react-icons/bs";

export default function PDFDownload(): ReactElement {
  const { questions, settings, details, isPDFLoading } = useApp();

  const PDFDownloadButton = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
    }
  );

  return (
    <div className="absolute bottom-4 right-4">
      <PDFDownloadButton
        document={
          <PDF questions={questions} settings={settings} details={details} />
        }
        fileName="test.pdf"
      >
        {({ loading }) => (
          <div className="bg-zinc-800 border-2 border-zinc-200 text-zinc-50 p-3.5 rounded-full opacity-50 hover:opacity-100 transition-500 hover:scale-125">
            {loading && isPDFLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            ) : (
              <BsFileEarmarkArrowDown size={24} />
            )}
          </div>
        )}
      </PDFDownloadButton>
    </div>
  );
}
