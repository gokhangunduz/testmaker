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
    <main
      className="w-full flex justify-center items-center flex-col lg:flex-row"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      <div className="hw-full flex items-center justify-center animate__animated animate__fadeInLeft">
        <Image
          width={768}
          height={768}
          src="/test.svg"
          alt=""
          aria-hidden="true"
          priority
        />
      </div>
      <div className="hw-full flex flex-col gap-8 items-center justify-center px-6 pb-10 animate__animated animate__fadeInRight">
        <h1 className="font-semibold text-2xl text-slate-700">
          {t("projectRelease")}
        </h1>
        <p className="text-center text-slate-500 max-w-xl">
          {t("projectDescription")}
        </p>
        <Button
          label={t("getStarted")}
          loading={isClicked}
          onClick={() => {
            setIsClicked(true);
            router.push("/app");
          }}
        />
      </div>
    </main>
  );
}
