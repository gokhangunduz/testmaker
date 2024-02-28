"use client";

import { ReactElement } from "react";
import PDF from "@/components/PDF/PDF";
import dynamic from "next/dynamic";
import useApp from "@/hooks/useApp";
import PDFLoading from "../PDFLoading/PDFLoading";
import _debounce from "lodash/debounce";

export default function Preview(): ReactElement {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <PDFLoading />,
    }
  );

  const { questions, settings, details, isPDFLoading } = useApp();

  return (
    <div className="hw-full">
      {isPDFLoading ? (
        <PDFLoading />
      ) : (
        <PDFViewer className="hw-full" showToolbar>
          <PDF questions={questions} settings={settings} details={details} />
        </PDFViewer>
      )}
    </div>
  );
}
