"use client";

import { DragEvent, ReactNode, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdUploadFile } from "react-icons/md";
import QuestionUpload from "../QuestionUpload/QuestionUpload";
import { fileToQuestionImage } from "@/functions/meta.image.function";
import { IQuestionImage } from "@/interfaces/pdf.question.interface";
import useApp from "@/hooks/useApp";

interface IQuestionUploader {
  children?: ReactNode;
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const [onDragging, setOnDragging] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { t } = useTranslation();
  const { questions, handleAddQuestions } = useApp();

  async function handleInputUploader(files: FileList | null) {
    setOnDragging(false);

    const images = Array.from(files ?? []).filter((file) =>
      file.type.startsWith("image/")
    );
    if (images.length === 0) return;

    const results = await Promise.allSettled(images.map(fileToQuestionImage));
    const loaded = results
      .filter(
        (result): result is PromiseFulfilledResult<IQuestionImage> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);

    setHasError(loaded.length !== images.length);
    if (loaded.length > 0) handleAddQuestions(loaded);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    handleInputUploader(e.dataTransfer.files);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOnDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOnDragging(false);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative hw-full bg-zinc-200 border-r border-zinc-300 transition-500 ${
        onDragging ? "flex items-center justify-center bg-zinc-400 opacity-75" : ""
      }`}
    >
      {!onDragging && children}
      {(questions.length === 0 || onDragging) && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-6 items-center justify-center">
          <MdUploadFile size={48} className="text-zinc-600" />
          <p className="text-zinc-500 text-base text-center">
            {t("dragAndDropQuestionImages")}
          </p>
        </div>
      )}
      {hasError && (
        <p
          role="alert"
          className="absolute bottom-4 left-4 z-20 rounded bg-red-100 px-3 py-1.5 text-sm text-red-700"
        >
          {t("imageLoadError")}
        </p>
      )}
      <QuestionUpload handleInputUploader={handleInputUploader} />
    </div>
  );
}
