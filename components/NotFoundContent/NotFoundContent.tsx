"use client";

import { ReactElement } from "react";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { useTranslation } from "react-i18next";

export default function NotFoundContent(): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10 text-center">
      <p className="text-6xl font-semibold text-muted">404</p>
      <h1 className="text-2xl font-semibold">{t("notFoundTitle")}</h1>
      <p className="max-w-md text-muted">{t("notFoundText")}</p>
      <Link href="/" className={buttonVariants({ variant: "primary" })}>
        {t("backHome")}
      </Link>
    </div>
  );
}
