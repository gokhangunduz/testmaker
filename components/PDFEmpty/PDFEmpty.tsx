"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlinePictureAsPdf } from "react-icons/md";

export default function PDFEmpty(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-foreground">
      <MdOutlinePictureAsPdf size={48} />
      <p>{t("pdfEmpty")}</p>
    </div>
  );
}
