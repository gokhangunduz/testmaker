"use client";

import Image from "next/image";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { useTranslation } from "react-i18next";
import Canvas from "react-cursor-rainbow-lines";

export default function Home(): ReactElement {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div
      className="w-full flex justify-center items-center flex-col lg:flex-row"
      style={{
        height: "calc(100vh - 6rem)",
      }}
    >
      <Canvas />
      <div className="hw-full flex items-center justify-center animate__animated animate__fadeInLeft">
        <Image width={768} height={768} src={"/test.svg"} alt="svg" />
      </div>
      <div className="hw-full flex flex-col gap-8 items-center justify-center animate__animated animate__fadeInRight">
        <h2 className="font-semibold text-2xl text-slate-700">
          {t("projectRelease")}
        </h2>
        <p className="text-center text-slate-500 w-1/2">
          {t("projectDescription")}
        </p>

        <Button label={t("getStarted")} onClick={() => router.push("/app")} />
      </div>
    </div>
  );
}
