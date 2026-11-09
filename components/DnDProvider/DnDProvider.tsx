"use client";

import { ReactElement } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useApp from "@/hooks/useApp";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function DnDProvider(): ReactElement {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 1 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { questions, handleOrderQuestion } = useApp();

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      handleOrderQuestion(String(active.id), String(over.id));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll
    >
      <SortableContext items={questions} strategy={verticalListSortingStrategy}>
        <div className="app-editor flex flex-col gap-3 p-4 overflow-auto">
          {questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
