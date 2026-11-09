"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

const environment = process.env.NODE_ENV === "production" ? "P" : "D";

export default function Footer(): ReactElement {
  const { t } = useTranslation();

  return (
    <footer className="w-full flex font-light justify-between items-center h-8 sticky bottom-0 z-30 bg-white border-t border-zinc-300 text-xs px-4">
      <p>
        {environment} {process.env.NEXT_PUBLIC_APP_VERSION}
      </p>
      <p>
        © {new Date().getFullYear()} TestMakerLab | {t("allRightsReserved")}
      </p>
    </footer>
  );
}
