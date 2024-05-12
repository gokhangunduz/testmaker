"use client";

import { ReactElement } from "react";
import PDF from "@/components/PDF/PDF";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import _debounce from "lodash/debounce";
import PDFPreview from "../PDFPreview/PDFPreview";
import PDFDownload from "../PDFDownload/PDFDownload";

export default function Preview(): ReactElement {
  const { questions, settings, isPDFLoading } = useApp();

  return (
    <div className="hw-full relative">
      {isPDFLoading ? (
        <PDFLoading />
      ) : (
        <PDFPreview>
          <PDF questions={questions} settings={settings} />
        </PDFPreview>
      )}
      {questions.length > 0 && !isPDFLoading && <PDFDownload />}
    </div>
  );
}
