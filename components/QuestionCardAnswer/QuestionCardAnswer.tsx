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
    <div className="flex">
      {["A", "B", "C", "D", "E", undefined].map((option, bIndex) => (
        <button
          className={`border border-gray-200 shadow-md w-9 h-9`}
          key={bIndex}
          onClick={(e: any) => {
            handleChangeAnswer(index, option as IQuestionAnswer);
          }}
        >
          {option || "None"}
        </button>
      ))}
    </div>
  );
}
