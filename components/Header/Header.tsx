"use client";

import { ReactElement } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

export default function Header(): ReactElement {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <header className="w-full flex justify-between h-20 sticky top-0 bg-white border-b border-zinc-300 items-center px-8">
      <div
        className="cursor-pointer text-xl font-semibold"
        onClick={() => router.push("/")}
      >
        TestMakerLab
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button
          label={t("feedback")}
          onClick={() => {
            router.push("mailto:me@gokhangunduz.dev");
          }}
        />
      </div>
    </header>
  );
}
