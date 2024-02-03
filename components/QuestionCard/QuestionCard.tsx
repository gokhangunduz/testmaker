import { IQuestion } from "@/interfaces/app.interface";
import Image from "next/image";
import { ReactElement, useState } from "react";
import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import Card from "../Card/Card";
import useApp from "@/hooks/useApp";
import QuestionCardImg from "../QuestionCardImg/QuestionCardImg";

interface IQuestionCard {
  question: IQuestion;
  index: number;
}

export default function QuestionCard({
  question,
  index,
}: Readonly<IQuestionCard>): ReactElement {
  const { handleChangeQuestion } = useApp();

  return (
    <Card>
      <div className=" h-full w-full flex justify-between">
        <QuestionCardImg index={index} image={question.image} />
        <QuestionCardAnswer index={index} answer={question.answer} />
      </div>
    </Card>
  );
}
