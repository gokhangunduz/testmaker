"use client";

import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { BsFileEarmarkArrowUp } from "react-icons/bs";

interface IQuestionUpload {
  handleInputUploader: (files: Iterable<File> | null) => void;
}

export default function QuestionUpload({
  handleInputUploader,
}: Readonly<IQuestionUpload>): ReactElement {
  const { t } = useTranslation();

  return (
    <label
      title={t("uploadQuestionImages")}
      className="absolute bottom-4 right-4 z-20 cursor-pointer bg-zinc-800 border-2 border-zinc-200 text-zinc-50 p-3.5 rounded-full opacity-50 hover:opacity-100 focus-within:opacity-100 transition-500 hover:scale-125"
    >
      <BsFileEarmarkArrowUp size={24} />
      <input
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        aria-label={t("uploadQuestionImages")}
        onChange={(e) => {
          handleInputUploader(e.target.files);
          e.target.value = "";
        }}
      />
    </label>
  );
}
