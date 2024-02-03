import useApp from "@/hooks/useApp";
import { ReactElement } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function QuestionsMapper(): ReactElement {
  const { questions } = useApp();

  return (
    <div
      className="flex flex-col gap-4 p-4 overflow-auto"
      style={{
        height: "calc(100vh - 6rem)",
      }}
    >
      {questions?.map((question, index) => (
        <QuestionCard key={index} question={question} index={index} />
      ))}
    </div>
  );
}
