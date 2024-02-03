"use client";

import { convertBase64 } from "@/functions/convertBase64";
import useApp from "@/hooks/useApp";
import { Fragment, ReactElement } from "react";

interface IQuestionUploader {
  children?: ReactElement | ReactElement[];
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const { handleAddQuestion } = useApp();

  return (
    <Fragment>
      <div className="relative h-full w-full bg-blue-300">
        <input
          onClick={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            Array.from(e.dataTransfer.files).map(async (file) => {
              handleAddQuestion(await convertBase64(file));
            });
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          type="file"
          className="absolute inset-0"
          accept="image/*"
        />
        {children}
      </div>
    </Fragment>
  );
}
