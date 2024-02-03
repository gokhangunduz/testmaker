import useApp from "@/hooks/useApp";
import { IQuestionAnswer } from "@/interfaces/app.interface";

interface IQuestionCardAnswer {
  index: number;
  answer: IQuestionAnswer;
}

export default function QuestionCardAnswer({
  index,
  answer,
}: Readonly<IQuestionCardAnswer>) {
  const { handleChangeAnswer } = useApp();

  return (
    <div className="flex gap-2">
      {["A", "B", "C", "D", "E"].map((option, bIndex) => (
        <button
          key={bIndex}
          onClick={(e: any) => {
            handleChangeAnswer(index, option as IQuestionAnswer);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
