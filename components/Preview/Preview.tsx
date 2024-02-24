"use client";

import { ReactElement } from "react";
import PDF from "@/components/PDF/PDF";
import dynamic from "next/dynamic";
import useApp from "@/hooks/useApp";

export default function Preview(): ReactElement {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );

  const { questions } = useApp();

  return (
    <div className="h-full w-full">
      <PDFViewer className="h-full w-full" showToolbar={false}>
        <PDF questions={questions} />
      </PDFViewer>
    </div>
  );
}
