"use client";

import { Draggable } from "react-beautiful-dnd";
import QuestionCard from "../QuestionCard/QuestionCard";
import { IQuestion } from "@/interfaces/app.interface";

interface IDraggableQuestionCard {
  index: number;
  question: IQuestion;
}

export default function DraggableQuestionCard({
  index,
  question,
}: IDraggableQuestionCard) {
  return (
    <Draggable key={index} draggableId={String(index)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="py-2"
        >
          <QuestionCard key={index} question={question} index={index} />
        </div>
      )}
    </Draggable>
  );
}
