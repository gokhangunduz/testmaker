"use client";

import { ReactElement, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextArea } from "@heroui/react";
import { MdDeleteSweep, MdOutlineChecklist } from "react-icons/md";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import QuestionUpload from "../QuestionUpload/QuestionUpload";
import useApp from "@/hooks/useApp";
import { handleParserQuestions } from "@/functions/parser.questions.function";
import { handleMapperPages } from "@/functions/mapper.pages.function";
import { formatAnswerKey, parseAnswerKey } from "@/functions/answerkey.function";

type DialogType = "answerKey" | "clear" | null;

export default function EditorToolbar(): ReactElement | null {
  const { questions, handleUploadFiles, handleSetAnswers, handleClearQuestions } =
    useApp();
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
      <div className="flex shrink-0 flex-col gap-2 border-b border-border bg-surface px-3 py-3 sm:px-4">
        <p className="text-sm text-muted">
          {t("summary", { count: questions.length, pages })}
        </p>
        <div className="flex flex-wrap gap-2">
          <QuestionUpload
            size="sm"
            label={t("addImages")}
            handleInputUploader={handleUploadFiles}
          />
          <Button
            size="sm"
            variant="secondary"
            icon={<MdOutlineChecklist size={18} />}
            label={t("fillAnswerKey")}
            onClick={openAnswerKey}
          />
          <Button
            size="sm"
            variant="danger-soft"
            icon={<MdDeleteSweep size={18} />}
            label={t("clearAll")}
            onClick={() => setDialog("clear")}
          />
        </div>
      </div>

      {dialog === "answerKey" && (
        <Modal
          header={
            <h2 className="text-xl font-semibold">{t("fillAnswerKey")}</h2>
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
            <p className="text-sm text-muted">{t("answerKeyHint")}</p>
            <TextArea
              aria-label={t("answerKey")}
              value={answerKey}
              onChange={(e) => setAnswerKey(e.target.value)}
              placeholder={t("answerKeyPlaceholder")}
              rows={4}
              spellCheck={false}
              fullWidth
              className="font-mono tracking-widest"
            />
          </div>
        </Modal>
      )}

      {dialog === "clear" && (
        <Modal
          size="xs"
          header={
            <h2 className="text-xl font-semibold">{t("clearAllTitle")}</h2>
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
          <p className="text-muted">{t("clearAllText")}</p>
        </Modal>
      )}
    </>
  );
}
