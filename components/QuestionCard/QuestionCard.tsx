"use client";

import { IQuestion } from "@/interfaces/app.interface";
import { ReactElement } from "react";
import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import Card from "../Card/Card";
import QuestionCardImg from "../QuestionCardImg/QuestionCardImg";
import { MdDragIndicator } from "react-icons/md";

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
      <div className="h-full w-full flex gap-4 items-center">
        <QuestionCardImg index={index} image={question.image} />
        <div className="h-full w-full flex flex-col justify-evenly">
          <p>Question {index + 1}</p>
          <QuestionCardAnswer index={index} answer={question.answer} />
        </div>
        <MdDragIndicator size={36} className="text-gray-400 cursor-pointer" />
      </div>
    </Card>
  );
}
