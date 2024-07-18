"use client";

import { convertBase64 } from "@/functions/convertbase64.function";
import handleGetImageMeta from "@/functions/meta.image.function";
import QuestionUpload from "../QuestionUpload/QuestionUpload";
import { Fragment, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdUploadFile } from "react-icons/md";
import useApp from "@/hooks/useApp";

interface IQuestionUploader {
  children?: ReactElement | ReactElement[];
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const [onDragging, setOnDragging] = useState<boolean>(false);

  const { t } = useTranslation();

  const { questions, handleAddQuestion } = useApp();

  function handleInputUploader(files: FileList) {
    setOnDragging(false);
    Array?.from(files)?.map(async (file) => {
      const { width, height, ratio } = await handleGetImageMeta(file);

      handleAddQuestion(
        URL.createObjectURL(file),
        await convertBase64(file),
        width,
        height,
        ratio,
        undefined
      );
    });
  }

  return (
    <Fragment>
      <div
        className={`relative hw-full bg-zinc-200 border-r border-zinc-300 transition-all duration-500 ${
          onDragging &&
          "flex items-center justify-center bg-zinc-400 opacity-75"
        }`}
      >
        <input
          onClick={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            handleInputUploader(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setOnDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setOnDragging(false);
          }}
          multiple
          type="file"
          className="absolute inset-0"
          accept="image/*"
          title="Questions"
        />
        {!onDragging && children}
        {(!questions?.length || onDragging) && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-6 items-center justify-center">
            <MdUploadFile size={48} className="text-zinc-600" />
            <p className="text-zinc-500 text-base">
              {t("dragAndDropQuestionImages")}
            </p>
          </div>
        )}
        <QuestionUpload handleInputUploader={handleInputUploader} />
      </div>
    </Fragment>
  );
}
