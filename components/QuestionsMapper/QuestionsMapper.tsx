"use client";

import { ReactElement } from "react";
import DnDProvider from "../DnDProvider/DnDProvider";
import DraggableQuestionCard from "../DraggableQuestionCard/DraggableQuestionCard";
import useApp from "@/hooks/useApp";

export default function QuestionsMapper(): ReactElement {
  const { questions } = useApp();

  return (
    <DnDProvider>
      {questions?.map((question, index) => (
        <DraggableQuestionCard key={index} question={question} index={index} />
      ))}
    </DnDProvider>
  );
}
