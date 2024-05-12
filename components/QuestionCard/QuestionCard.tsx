"use client";

import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import QuestionScaleInput from "../QuestionScaleInput/QuestionScaleInput";
import Image from "next/image";
import { IQuestion } from "@/interfaces/pdf.question.interface";
import { MdDragIndicator } from "react-icons/md";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
interface IQuestionCard {
  question: IQuestion;
  index: number;
}

export default function QuestionCard({
  question,
  index,
}: Readonly<IQuestionCard>): ReactElement {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <div className="hw-full flex gap-1 items-center">
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
          src={question.base64!}
          alt="Question Image"
        />
        <div className="hw-full flex flex-col gap-6 justify-evenly">
          <label className="text-zinc-800 font-bold">
            {t("question")} {index + 1}
          </label>
          <QuestionScaleInput index={index} scale={question.scale} />
          <QuestionCardAnswer index={index} answer={question.answer} />
        </div>
        <MdDragIndicator size={36} className="text-gray-400 cursor-pointer" />
      </div>
    </Card>
  );
}
