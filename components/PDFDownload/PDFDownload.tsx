"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import PDF from "../PDF/PDF";
import useApp from "@/hooks/useApp";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

function toFileName(title: string): string {
  const safe = title.trim().replace(/[^\p{L}\p{N}_-]+/gu, "-");
  return `${safe || "test"}.pdf`;
}

export default function PDFDownload(): ReactElement {
  const { questions, settings } = useApp();
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-4 right-4">
      <PDFDownloadLink
        document={
          <PDF
            questions={questions}
            settings={settings}
            answersTitle={t("answerKey")}
          />
        }
        fileName={toFileName(settings.details.title)}
        aria-label={t("downloadPdf")}
        title={t("downloadPdf")}
      >
        {({ loading }) => (
          <div className="bg-zinc-800 border-2 border-zinc-200 text-zinc-50 p-3.5 rounded-full opacity-50 hover:opacity-100 transition-500 hover:scale-125">
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            ) : (
              <BsFileEarmarkArrowDown size={24} />
            )}
          </div>
        )}
      </PDFDownloadLink>
    </div>
  );
}
