"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { CONTACT_EMAIL } from "@/configs/config";

export default function Header(): ReactElement {
  const { t } = useTranslation();

  return (
    <header className="w-full flex justify-between h-20 sticky top-0 z-30 bg-white border-b border-zinc-300 items-center px-4 sm:px-8">
      <Link href="/" className="text-xl font-semibold">
        TestMakerLab
      </Link>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 transition-300"
        >
          {t("feedback")}
        </a>
      </div>
    </header>
  );
}
