"use client";

import { ReactElement, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { CONTACT_EMAIL } from "@/configs/config";

const STORAGE_KEY = "welcome-seen";

function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberWelcome(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage unavailable, the welcome just shows again next time
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export default function WelcomeModal(): ReactElement | null {
  const seen = useSyncExternalStore(subscribe, hasSeenWelcome, () => true);
  const [dismissed, setDismissed] = useState<boolean>(false);
  const { t } = useTranslation();

  function close() {
    rememberWelcome();
    setDismissed(true);
  }

  if (seen || dismissed) return null;

  return (
    <Modal
      onHide={close}
      header={<h2 className="text-2xl font-semibold">{t("welcome")}</h2>}
      footer={<Button label={t("getStarted")} onClick={close} />}
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted">{t("projectDescription")}</p>
        <p className="font-semibold">{t("beta")}</p>
        <p className="text-muted">{t("issues")}</p>
        <p className="text-muted">
          {t("betaEmail")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </Modal>
  );
}
