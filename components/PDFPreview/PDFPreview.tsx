"use client";

import dynamic from "next/dynamic";
import { ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import PDFLoading from "../PDFLoading/PDFLoading";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false, loading: () => <PDFLoading /> }
);

interface IPDFPreview {
  children: ReactElement<DocumentProps>;
}

export default function PDFPreview({ children }: IPDFPreview): ReactElement {
  return (
    <PDFViewer className="h-full w-full border-0" showToolbar>
      {children}
    </PDFViewer>
  );
}
