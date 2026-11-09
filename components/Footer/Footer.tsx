"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

const environment = process.env.NODE_ENV === "production" ? "P" : "D";

export default function Footer(): ReactElement {
  const { t } = useTranslation();

  return (
    <footer className="z-30 flex h-8 shrink-0 items-center justify-between gap-3 border-t border-border bg-surface px-3 text-xs text-muted sm:px-6">
      <p className="shrink-0">
        {environment} {process.env.NEXT_PUBLIC_APP_VERSION}
      </p>
      <p className="truncate">
        © {new Date().getFullYear()} TestMakerLab
        <span className="hidden sm:inline"> | {t("allRightsReserved")}</span>
      </p>
    </footer>
  );
}
