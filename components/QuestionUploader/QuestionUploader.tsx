"use client";

import {
  DragEvent,
  ReactNode,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import QuestionUpload from "../QuestionUpload/QuestionUpload";
import useApp from "@/hooks/useApp";

interface IQuestionUploader {
  children?: ReactNode;
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const [onDragging, setOnDragging] = useState<boolean>(false);
  const dragDepth = useRef<number>(0);

  const { t } = useTranslation();
  const {
    questions,
    handleUploadFiles,
    uploadErrors,
    dismissUploadErrors,
    isRestoring,
  } = useApp();

  function handleInputUploader(files: Iterable<File> | null) {
    dragDepth.current = 0;
    setOnDragging(false);
    handleUploadFiles(files);
  }

  useEffect(() => {
    if (uploadErrors.length === 0) return;

    const timeout = setTimeout(dismissUploadErrors, 8000);
    return () => clearTimeout(timeout);
  }, [uploadErrors, dismissUploadErrors]);

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.some((file) => file.type.startsWith("image/"))) {
        e.preventDefault();
        handleInputUploader(files);
      }
    }

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleInputUploader(e.dataTransfer.files);
  }

  function handleDragEnter(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragDepth.current += 1;
    setOnDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setOnDragging(false);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className="relative flex min-h-0 flex-1 flex-col"
    >
      {uploadErrors.length > 0 && (
        <div
          role="alert"
          className="flex shrink-0 items-start justify-between gap-2 border-b border-border bg-danger-soft px-3 py-2 text-sm text-danger-soft-foreground"
        >
          <p className="min-w-0 break-words">
            {t("imageLoadError", {
              names:
                uploadErrors.slice(0, 3).join(", ") +
                (uploadErrors.length > 3 ? ` +${uploadErrors.length - 3}` : ""),
              count: uploadErrors.length,
            })}
          </p>
          <button
            type="button"
            aria-label={t("close")}
            onClick={dismissUploadErrors}
            className="shrink-0 rounded p-1 hover:bg-danger/10 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <MdClose size={18} />
          </button>
        </div>
      )}

      {children}

      {questions.length === 0 && !isRestoring && !onDragging && (
        <div className="flex flex-1 items-center justify-center p-4">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-10 text-center">
            <MdOutlineCloudUpload size={48} className="text-muted" />
            <p className="font-medium">{t("dragAndDropQuestionImages")}</p>
            <QuestionUpload
              label={t("browseImages")}
              handleInputUploader={handleInputUploader}
            />
            <p className="max-w-64 text-sm text-muted">{t("pasteHint")}</p>
          </div>
        </div>
      )}

      {onDragging && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-accent bg-accent-soft/90 text-accent-soft-foreground"
        >
          <MdOutlineCloudUpload size={48} />
          <p className="font-medium">{t("dragAndDropQuestionImages")}</p>
        </div>
      )}

    </div>
  );
}
