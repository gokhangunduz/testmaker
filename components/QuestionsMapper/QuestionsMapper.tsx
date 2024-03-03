"use client";

import DraggableQuestionCard from "../DraggableQuestionCard/DraggableQuestionCard";
import DnDProvider from "../DnDProvider/DnDProvider";
import { ReactElement } from "react";
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
