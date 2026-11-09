"use client";

import Image from "next/image";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button/Button";

export default function Home(): ReactElement {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-4 sm:gap-8 sm:py-8 lg:flex-row lg:gap-16 lg:px-8 [@media(max-height:500px)]:flex-row [@media(max-height:500px)]:gap-6 [@media(max-height:500px)]:py-2">
      <div className="flex w-full max-w-xs items-center justify-center animate__animated animate__fadeInLeft sm:max-w-md lg:max-w-none lg:flex-1">
        <Image
          width={768}
          height={768}
          src="/test.svg"
          alt=""
          aria-hidden="true"
          priority
          className="h-auto max-h-[30dvh] w-auto max-w-full lg:max-h-[60dvh] [@media(max-height:500px)]:max-h-[60dvh]"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 text-center animate__animated animate__fadeInRight lg:flex-1 lg:items-start lg:text-left">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          {t("projectRelease")}
        </h1>
        <p className="max-w-xl text-muted">{t("projectDescription")}</p>
        <Button
          size="lg"
          label={t("getStarted")}
          loading={isClicked}
          onClick={() => {
            setIsClicked(true);
            router.push("/app");
          }}
        />
      </div>
    </div>
  );
}
