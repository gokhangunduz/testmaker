"use client";

import handleGetImageMeta from "@/functions/meta.image.function";
import { convertBase64 } from "@/functions/convertBase64";
import { Fragment, ReactElement, useState } from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { MdUploadFile } from "react-icons/md";
import useApp from "@/hooks/useApp";
import { DragEvent } from "react";

interface IQuestionUploader {
  children?: ReactElement | ReactElement[];
}

export default function QuestionUploader({
  children,
}: Readonly<IQuestionUploader>): ReactElement {
  const [onDragging, setOnDragging] = useState<boolean>(false);

  const { questions, handleAddQuestion } = useApp();

  function handleInputUploader(e: DragEvent<HTMLInputElement>) {
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
          onDrop={async (e) => handleInputUploader(e)}
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
        />
        {!onDragging && children}
        {(!questions?.length || onDragging) && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-6 items-center justify-center">
            <MdUploadFile size={48} className="text-zinc-600" />
            <p className="text-zinc-500 text-base">
              Drag and drop questions new image here.
            </p>
          </div>
        )}
        <div className="absolute bottom-4 right-4 z-20 cursor-pointer">
          <div className="bg-zinc-800 border-2 border-zinc-200 text-zinc-50 p-3.5 rounded-full opacity-50 hover:opacity-100 transition-500 hover:scale-125">
            <BsFileEarmarkArrowUp size={24} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
