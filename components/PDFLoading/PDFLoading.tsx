"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "@heroui/react";

export default function PDFLoading(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center text-foreground">
      <Spinner size="lg" />
      <p>{t("pdfLoading")}</p>
    </div>
  );
}
