"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import useApp from "@/hooks/useApp";

export function ExternalChangeBanner(): ReactElement | null {
  const { externalChange } = useApp();
  const { t } = useTranslation();

  if (!externalChange) return null;

  return (
    <div
      role="alert"
      className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-warning-soft px-3 py-2 text-sm text-warning-soft-foreground sm:px-4"
    >
      <p className="min-w-0">{t("externalChange")}</p>
      <Button
        size="sm"
        variant="secondary"
        label={t("reload")}
        onClick={() => window.location.reload()}
      />
    </div>
  );
}

export function UndoBar(): ReactElement | null {
  const { undo, handleUndo, dismissUndo } = useApp();
  const { t } = useTranslation();

  if (!undo) return null;

  return (
    <div
      role="status"
      className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-foreground px-3 py-2 text-sm text-background sm:px-4"
    >
      <p className="min-w-0">{t(`undo_${undo.kind}`)}</p>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          size="sm"
          variant="secondary"
          label={t("undo")}
          autoFocus={undo.kind !== "reset"}
          onClick={handleUndo}
        />
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          className="text-background"
          ariaLabel={t("close")}
          icon={<MdClose size={18} />}
          onClick={dismissUndo}
        />
      </div>
    </div>
  );
}
