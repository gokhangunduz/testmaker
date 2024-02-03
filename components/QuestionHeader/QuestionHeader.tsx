import { ReactElement } from "react";

interface IQuestionHeader {
  index: number;
}

export default function QuestionHeader({
  index,
}: Readonly<IQuestionHeader>): ReactElement {
  return (
    <div className="flex items-center justify-between">
      <div />
      <p className="text-lg text-center font-bold">Question {index + 1}</p>
      <span>Trash</span>
    </div>
  );
}
