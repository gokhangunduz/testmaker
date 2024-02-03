import { IQuestion } from "@/interfaces/app.interface";
import { ReactElement } from "react";
import QuestionCardAnswer from "../QuestionCardAnswer/QuestionCardAnswer";
import Card from "../Card/Card";
import QuestionCardImg from "../QuestionCardImg/QuestionCardImg";
import QuestionHeader from "../QuestionHeader/QuestionHeader";

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
      <QuestionHeader index={index} />
      <div className="h-full w-full flex justify-between items-center">
        <QuestionCardImg index={index} image={question.image} />
        <QuestionCardAnswer index={index} answer={question.answer} />
      </div>
    </Card>
  );
}
