"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { ReactElement } from "react";
import Document from "@/components/Document/Document";

export default function Preview(): ReactElement {
  return (
    <div className="h-full w-full">
      <PDFViewer className="h-full w-full" showToolbar={false}>
        <Document />
      </PDFViewer>
    </div>
  );
}
