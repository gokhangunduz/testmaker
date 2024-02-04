import { ReactElement } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableQuestionCards from "../DraggableQuestionCards/DraggableQuestionCards";
import DnDProvider from "../DnDProvider/DnDProvider";

export default function QuestionsMapper(): ReactElement {
  return (
    <DnDProvider>
      <DraggableQuestionCards />
    </DnDProvider>
  );
}
