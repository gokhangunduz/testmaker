"use client";

import { ReactElement, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import useApp from "@/hooks/useApp";
import { handleParserQuestions } from "@/functions/parser.questions.function";
import { handleMapperPages } from "@/functions/mapper.pages.function";
import { formatAnswerKey, parseAnswerKey } from "@/functions/answerkey.function";

type DialogType = "answerKey" | "clear" | null;

export default function EditorToolbar(): ReactElement | null {
  const { questions, handleSetAnswers, handleClearQuestions } = useApp();
  const { t } = useTranslation();

  const [dialog, setDialog] = useState<DialogType>(null);
  const [answerKey, setAnswerKey] = useState<string>("");

  const pages = useMemo(
    () => handleMapperPages(handleParserQuestions(questions)).length,
    [questions]
  );

  if (questions.length === 0) return null;

  function openAnswerKey() {
    setAnswerKey(formatAnswerKey(questions.map((q) => q.answer)));
    setDialog("answerKey");
  }

  function applyAnswerKey() {
    handleSetAnswers(parseAnswerKey(answerKey));
    setDialog(null);
  }

  function confirmClear() {
    handleClearQuestions();
    setDialog(null);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-300 bg-white px-4 py-2">
        <p className="text-sm text-zinc-600">
          {t("summary", { count: questions.length, pages })}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            label={t("fillAnswerKey")}
            onClick={openAnswerKey}
          />
          <Button
            variant="danger-soft"
            label={t("clearAll")}
            onClick={() => setDialog("clear")}
          />
        </div>
      </div>

      {dialog === "answerKey" && (
        <Modal
          header={
            <h2 className="text-xl font-semibold text-slate-700">
              {t("fillAnswerKey")}
            </h2>
          }
          footer={
            <>
              <Button
                variant="secondary"
                label={t("cancel")}
                onClick={() => setDialog(null)}
              />
              <Button label={t("apply")} onClick={applyAnswerKey} />
            </>
          }
          onHide={() => setDialog(null)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm text-slate-500">{t("answerKeyHint")}</p>
            <textarea
              aria-label={t("answerKey")}
              value={answerKey}
              onChange={(e) => setAnswerKey(e.target.value)}
              placeholder={t("answerKeyPlaceholder")}
              rows={4}
              spellCheck={false}
              className="w-full rounded-lg border border-zinc-300 p-3 font-mono tracking-widest focus:outline-2 focus:outline-zinc-400"
            />
          </div>
        </Modal>
      )}

      {dialog === "clear" && (
        <Modal
          size="xs"
          header={
            <h2 className="text-xl font-semibold text-slate-700">
              {t("clearAllTitle")}
            </h2>
          }
          footer={
            <>
              <Button
                variant="secondary"
                label={t("cancel")}
                onClick={() => setDialog(null)}
              />
              <Button
                variant="danger"
                label={t("clearAll")}
                onClick={confirmClear}
              />
            </>
          }
          onHide={() => setDialog(null)}
        >
          <p className="text-slate-500">{t("clearAllText")}</p>
        </Modal>
      )}
    </>
  );
}
