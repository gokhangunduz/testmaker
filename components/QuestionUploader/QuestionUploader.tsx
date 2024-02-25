"use client";

import { convertBase64 } from "@/functions/convertBase64";
import useApp from "@/hooks/useApp";
import { Fragment, ReactElement, useState } from "react";
import handleGetImageMeta from "@/functions/meta.image.function";

interface IQuestionUploader {
  children?: ReactElement | ReactElement[];
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const [onDragging, setOnDragging] = useState<boolean>(false);

  const { questions, handleAddQuestion } = useApp();

  return (
    <Fragment>
      <div
        className={`relative h-full w-full transition-all duration-500 ${
          onDragging &&
          "flex items-center justify-center bg-gray-300 opacity-75"
        }`}
      >
        <input
          onClick={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault();
            setOnDragging(false);
            Array.from(e.dataTransfer.files).map(async (file) => {
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
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setOnDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setOnDragging(false);
          }}
          type="file"
          className="absolute inset-0"
          accept="image/*"
        />
        {children}
        {!questions?.length && onDragging && (
          <p className="absolute z-10">
            Drag and drop your question image here.
          </p>
        )}
      </div>
    </Fragment>
  );
}
