import dynamic from "next/dynamic";
import { ReactElement } from "react";
import PDFLoading from "../PDFLoading/PDFLoading";

interface IPDFPreview {
  children: ReactElement;
}

export default function PDFPreview({ children }: IPDFPreview): ReactElement {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <PDFLoading />,
    }
  );

  return (
    <PDFViewer className="hw-full" showToolbar>
      {children}
    </PDFViewer>
  );
}
