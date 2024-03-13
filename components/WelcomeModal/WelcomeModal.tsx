"use client";

import { Fragment, ReactElement, useState } from "react";
import Modal from "../Modal/Modal";
import { useTranslation } from "react-i18next";
import PackageJson from "@/package.json";
import Link from "next/link";
import Button from "../Button/Button";

export default function WelcomeModal(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <Fragment>
      {isOpen && (
        <Modal onHide={() => setIsOpen(false)}>
          <div className="flex flex-col gap-8 items-center">
            <h2 className="text-2xl font-semibold text-slate-700">
              {t("welcome")}
            </h2>
            <p className="text-center text-slate-500">
              {t("projectDescription")}
            </p>
            <p className="text-center text-slate-500">
              <span className="text-slate-700 font-semibold">{t("beta")}</span>{" "}
            </p>
            <p className="text-center text-slate-500">{t("issues")}</p>
            <p className="text-center text-slate-500">
              {t("betaEmail")}{" "}
              <Link
                href={`mailto:${PackageJson?.author?.email}`}
                className="text-slate-700"
              >
                {PackageJson?.author?.email}
              </Link>
            </p>
            <Button label={t("getStarted")} onClick={() => setIsOpen(false)} />
          </div>
        </Modal>
      )}
    </Fragment>
  );
}
