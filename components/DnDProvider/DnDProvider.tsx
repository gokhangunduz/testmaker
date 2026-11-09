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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import useApp from "@/hooks/useApp";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function DnDProvider(): ReactElement | null {
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

  if (questions.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      autoScroll
    >
      <SortableContext items={questions} strategy={rectSortingStrategy}>
        <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-1 content-start gap-3 overflow-y-auto p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-1">
          {questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
