"use client";

import { ReactElement } from "react";
import PDF from "@/components/PDF/PDF";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import _debounce from "lodash/debounce";
import PDFPreview from "../PDFPreview/PDFPreview";
import PDFDownload from "../PDFDownload/PDFDownload";
import PDFEmpty from "../PDFEmpty/PDFEmpty";

export default function Preview(): ReactElement {
  const { questions, settings, isPDFLoading } = useApp();

  const renderPDF = () => {
    if (isPDFLoading) {
      return <PDFLoading />;
    } else if (questions == null || questions.length == 0) {
      return <PDFEmpty />;
    } else {
      return (
        <PDFPreview>
          <PDF questions={questions} settings={settings} />
        </PDFPreview>
      );
    }
  };

  return (
    <div className="hw-full relative">
      {renderPDF()}

      {questions.length > 0 && !isPDFLoading && <PDFDownload />}
    </div>
  );
}
