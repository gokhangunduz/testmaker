"use client";

import { ReactElement, useRef } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import Button from "../Button/Button";

interface IQuestionUpload {
  label: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  handleInputUploader: (files: Iterable<File> | null) => void;
}

export default function QuestionUpload({
  label,
  variant = "primary",
  size,
  handleInputUploader,
}: Readonly<IQuestionUpload>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        icon={<MdAddPhotoAlternate size={18} />}
        label={label}
        onClick={() => inputRef.current?.click()}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif,.tif,.tiff"
        multiple
        hidden
        tabIndex={-1}
        onChange={(e) => {
          handleInputUploader(e.target.files);
          e.target.value = "";
        }}
      />
    </>
  );
}
