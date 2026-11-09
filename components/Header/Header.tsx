"use client";

import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@heroui/react";
import { MdOutlineMail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { CONTACT_EMAIL } from "@/configs/config";

export default function Header(): ReactElement {
  const { t } = useTranslation();

  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 sm:h-16 sm:px-6 [@media(max-height:500px)]:h-12">
      <Link
        href="/"
        className="flex min-h-10 min-w-10 items-center gap-2 text-lg font-semibold sm:text-xl"
      >
        <Image src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
        <span className="max-[340px]:sr-only">TestMakerLab</span>
      </Link>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label={t("feedback")}
          className={buttonVariants({ variant: "primary" })}
        >
          <MdOutlineMail size={18} />
          <span className="hidden sm:inline">{t("feedback")}</span>
        </a>
      </div>
    </header>
  );
}
