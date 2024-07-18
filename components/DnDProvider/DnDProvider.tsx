import React, { ReactElement } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useApp from "@/hooks/useApp";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function DnDProvider(): ReactElement {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const { questions, handleOrderQuestion } = useApp();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);
      handleOrderQuestion(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll
    >
      <SortableContext items={questions} strategy={verticalListSortingStrategy}>
        <div
          className="flex flex-col gap-3 p-4 overflow-auto"
          style={{
            height: "calc(100vh - 7rem)",
          }}
        >
          {questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
