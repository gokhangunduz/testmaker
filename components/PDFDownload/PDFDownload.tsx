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
          <div className="flex items-center gap-2 rounded-full border-2 border-zinc-200 bg-zinc-800 px-5 py-3 text-sm font-medium text-zinc-50 shadow-lg hover:bg-zinc-700 transition-300">
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
            ) : (
              <BsFileEarmarkArrowDown size={20} />
            )}
            {t("downloadPdf")}
          </div>
        )}
      </PDFDownloadLink>
    </div>
  );
}
