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
    <header className="w-full flex justify-between h-16 sticky top-0 bg-white border-b border-zinc-300 items-center px-8">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        TestMakerLab
      </div>
      <div className="flex gap-2">
        <LanguageSwitcher />
        <Button label={t("feedback")} outlined icon="pi pi-envelope" />
      </div>
    </header>
  );
}
