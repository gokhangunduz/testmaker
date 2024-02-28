"use client";

import { ReactElement } from "react";
import PDF from "@/components/PDF/PDF";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import _debounce from "lodash/debounce";
import PDFPreview from "../PDFPreview/PDFPreview";

export default function Preview(): ReactElement {
  const { questions, settings, details, isPDFLoading } = useApp();

  return (
    <div className="hw-full">
      {isPDFLoading ? (
        <PDFLoading />
      ) : (
        <PDFPreview>
          <PDF questions={questions} settings={settings} details={details} />
        </PDFPreview>
      )}
    </div>
  );
}
