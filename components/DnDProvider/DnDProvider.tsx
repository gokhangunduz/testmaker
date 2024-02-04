"use client";

import useApp from "@/hooks/useApp";
import { ReactElement } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface IDnDProvider {
  children: ReactElement | ReactElement[];
}

export default function DnDProvider({ children }: IDnDProvider): ReactElement {
  const { handleOrderQuestion } = useApp();

  return (
    <DragDropContext
      onDragEnd={(e) => {
        e.destination?.index &&
          handleOrderQuestion(e.source.index, e.destination.index);
      }}
    >
      <Droppable droppableId="questions">
        {(provided) => (
          <div
            className="flex flex-col p-4 overflow-auto"
            style={{
              height: "calc(100vh - 6rem)",
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
