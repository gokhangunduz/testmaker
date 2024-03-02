"use client";

import useApp from "@/hooks/useApp";
import { ReactElement } from "react";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";

interface IDnDProvider {
  children: ReactElement | ReactElement[];
}

export default function DnDProvider({ children }: IDnDProvider): ReactElement {
  const { handleOrderQuestion } = useApp();

  resetServerContext();

  return (
    <DragDropContext
      onDragEnd={(e) => {
        typeof e.destination?.index === "number" &&
          handleOrderQuestion(e.source.index, e.destination.index);
      }}
    >
      <Droppable droppableId="questions">
        {(provided) => {
          const containerStyle = {
            height: "calc(100vh - 6rem)",
          };

          return (
            <div
              className="flex flex-col p-4 overflow-auto"
              style={containerStyle}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
