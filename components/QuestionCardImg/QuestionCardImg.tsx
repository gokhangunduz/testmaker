"use client";

import { IQuestionBase64 } from "@/interfaces/pdf.question.interface";
import Image from "next/image";
import { ReactElement } from "react";

interface IQuestionCardImg {
  index: number;
  base64: IQuestionBase64;
}

export default function QuestionCardImg({
  index,
  base64,
}: IQuestionCardImg): ReactElement {
  return (
    <Image
      height={96}
      width={96}
      style={{
        objectFit: "contain",
        objectPosition: "center",
        minWidth: "96px",
        minHeight: "96px",
        maxHeight: "96px",
        maxWidth: "96px",
      }}
      src={base64!}
      alt="Question Image"
    />
  );
}
