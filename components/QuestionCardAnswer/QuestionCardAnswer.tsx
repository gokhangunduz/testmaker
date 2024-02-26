"use client";

import useApp from "@/hooks/useApp";
import { IQuestionAnswer } from "@/interfaces/pdf.question.interface";
import { SelectButton } from "primereact/selectbutton";

interface IQuestionCardAnswer {
  index: number;
  answer: IQuestionAnswer;
}

export default function QuestionCardAnswer({
  index,
  answer,
}: Readonly<IQuestionCardAnswer>) {
  const { handleChangeAnswer, handleRemoveQuestion } = useApp();

  return (
    <SelectButton
      className="flex text-xs transition-500"
      value={answer}
      options={["A", "B", "C", "D", "E", "N/A", "🗑️"]}
      onChange={(e) => {
        if (e.value === "🗑️") {
          return handleRemoveQuestion(index);
        }

        if (e.value === "N/A") {
          return handleChangeAnswer(index, null);
        }

        handleChangeAnswer(index, e.value);
      }}
    />
  );
}
