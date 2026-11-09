"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export default function PDFEmpty(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="hw-full px-1.5 pt-1.5 bg-[#787878]">
      <div className="hw-full bg-white flex flex-col gap-4 items-center justify-center">
        <p>{t("pdfEmpty")}</p>
      </div>
    </div>
  );
}
