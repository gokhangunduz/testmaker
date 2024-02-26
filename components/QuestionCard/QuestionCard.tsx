"use client";

import { ReactElement } from "react";
import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import Card from "../Card/Card";
import QuestionCardImg from "../QuestionCardImg/QuestionCardImg";
import { MdDragIndicator } from "react-icons/md";
import QuestionScaleInput from "../QuestionScaleInput/QuestionScaleInput";
import { IQuestion } from "@/interfaces/pdf.question.interface";

interface IQuestionCard {
  question: IQuestion;
  index: number;
}

export default function QuestionCard({
  question,
  index,
}: Readonly<IQuestionCard>): ReactElement {
  return (
    <Card>
      <div className="hw-full flex gap-4 items-center">
        <QuestionCardImg index={index} base64={question.base64} />
        <div className="hw-full flex flex-col gap-4 justify-evenly">
          <p>Question {index + 1}</p>
          <QuestionScaleInput index={index} scale={question.scale} />
          <QuestionCardAnswer index={index} answer={question.answer} />
        </div>
        <MdDragIndicator size={36} className="text-gray-400 cursor-pointer" />
      </div>
    </Card>
  );
}
