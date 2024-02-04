import useApp from "@/hooks/useApp";
import { Fragment, ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import QuestionCard from "../QuestionCard/QuestionCard";

export default function DraggableQuestionCards(): ReactElement {
  const { questions } = useApp();

  return (
    <Fragment>
      {questions?.map((question, index) => (
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
      ))}
    </Fragment>
  );
}
