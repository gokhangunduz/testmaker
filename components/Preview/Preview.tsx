"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import PDF from "@/components/PDF/PDF";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import PDFPreview from "../PDFPreview/PDFPreview";
import PDFDownload from "../PDFDownload/PDFDownload";
import PDFEmpty from "../PDFEmpty/PDFEmpty";

export default function Preview(): ReactElement {
  const { questions, settings, isPDFLoading } = useApp();
  const { t } = useTranslation();

  function renderPDF() {
    if (isPDFLoading) return <PDFLoading />;
    if (questions.length === 0) return <PDFEmpty />;

    return (
      <PDFPreview>
        <PDF
          questions={questions}
          settings={settings}
          answersTitle={t("answerKey")}
        />
      </PDFPreview>
    );
  }

  return (
    <div className="hw-full relative">
      {renderPDF()}
      {questions.length > 0 && !isPDFLoading && <PDFDownload />}
    </div>
  );
}
