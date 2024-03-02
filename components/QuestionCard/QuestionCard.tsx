"use client";

import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import QuestionScaleInput from "../QuestionScaleInput/QuestionScaleInput";
import QuestionCardImg from "../QuestionCardImg/QuestionCardImg";
import { IQuestion } from "@/interfaces/pdf.question.interface";
import { MdDragIndicator } from "react-icons/md";
import { ReactElement } from "react";
import Card from "../Card/Card";
import { useTranslation } from "react-i18next";

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
    <Card>
      <div className="hw-full flex gap-4 items-center">
        <QuestionCardImg index={index} base64={question.base64} />
        <div className="hw-full flex flex-col gap-4 justify-evenly">
          <p>
            {t("question")} {index + 1}
          </p>
          <QuestionScaleInput index={index} scale={question.scale} />
          <QuestionCardAnswer index={index} answer={question.answer} />
        </div>
        <MdDragIndicator size={36} className="text-gray-400 cursor-pointer" />
      </div>
    </Card>
  );
}
