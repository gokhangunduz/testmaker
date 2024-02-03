import { IQuestionImage } from "@/interfaces/app.interface";
import Image from "next/image";
import { ReactElement } from "react";

interface IQuestionCardImg {
  index: number;
  image: IQuestionImage;
}

export default function QuestionCardImg({
  index,
  image,
}: IQuestionCardImg): ReactElement {
  return (
    <Image
      height={96}
      width={128}
      style={{
        objectFit: "contain",
        objectPosition: "center",
        minWidth: "128px",
        minHeight: "96px",
        maxHeight: "96px",
        maxWidth: "128px",
      }}
      src={image!}
      alt="Question Image"
    />
  );
}
