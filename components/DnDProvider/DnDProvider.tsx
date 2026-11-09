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
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const position = (id: string | number) =>
    questions.findIndex((q) => q.id === String(id)) + 1;

  const accessibility = {
    screenReaderInstructions: { draggable: t("dndInstructions") },
    announcements: {
      onDragStart: ({ active }: DragStartEvent) =>
        t("dndPickedUp", { n: position(active.id) }),
      onDragOver: ({ active, over }: DragOverEvent) =>
        over && over.id !== active.id
          ? t("dndMovedOver", { n: position(active.id), target: position(over.id) })
          : undefined,
      onDragEnd: ({ active, over }: DragEndEvent) =>
        t("dndDropped", {
          n: position(active.id),
          target: position(over?.id ?? active.id),
        }),
      onDragCancel: () => t("dndCancelled"),
    },
  };

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
      accessibility={accessibility}
    >
      <SortableContext items={questions} strategy={rectSortingStrategy}>
        <div className="grid auto-rows-min grid-cols-1 content-start gap-3 p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-1">
          {questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
