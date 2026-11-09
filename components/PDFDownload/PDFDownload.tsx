"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { buttonVariants, Spinner } from "@heroui/react";
import { MdOutlineFileDownload } from "react-icons/md";
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

export default function PDFDownload({
  disabled,
}: {
  disabled?: boolean;
}): ReactElement | null {
  const { questions, settings } = useApp();
  const { t } = useTranslation();

  if (disabled) {
    return (
      <span
        className={`${buttonVariants({ variant: "primary", size: "sm" })} pointer-events-none opacity-50`}
      >
        <Spinner size="sm" />
        {t("downloadPdf")}
      </span>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <PDF
          questions={questions}
          settings={settings}
          answersTitle={t("answerKey")}
        />
      }
      fileName={toFileName(settings.details.title)}
      className={buttonVariants({ variant: "primary", size: "sm" })}
    >
      {({ loading }) => (
        <>
          {loading ? <Spinner size="sm" /> : <MdOutlineFileDownload size={18} />}
          {t("downloadPdf")}
        </>
      )}
    </PDFDownloadLink>
  );
}
