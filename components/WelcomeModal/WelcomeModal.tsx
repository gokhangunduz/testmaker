"use client";

import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { CONTACT_EMAIL } from "@/configs/config";

export default function WelcomeModal(): ReactElement | null {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal onHide={() => setIsOpen(false)}>
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-semibold">
          {t("welcome")}
        </h2>
        <p className="text-muted">{t("projectDescription")}</p>
        <p className="font-semibold">{t("beta")}</p>
        <p className="text-muted">{t("issues")}</p>
        <p className="text-muted">
          {t("betaEmail")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <Button label={t("getStarted")} onClick={() => setIsOpen(false)} />
      </div>
    </Modal>
  );
}
