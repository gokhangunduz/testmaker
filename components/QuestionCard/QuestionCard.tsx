import React, { CSSProperties, Fragment, ReactElement } from "react";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IQuestion,
  IQuestionAnswer,
} from "@/interfaces/pdf.question.interface";
import {
  NumberFieldRoot,
  Label,
  NumberFieldGroup,
  NumberFieldInput,
  Card,
} from "@heroui/react";
import useApp from "@/hooks/useApp";
import SidebarSection from "../SidebarSection/SidebarSection";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import useToggle from "@/hooks/useToggle";
import EditorModal from "../EditorModal/EditorModal";

interface IQuestionCard {
  question: IQuestion;
  index: number;
}

export default function QuestionCard({
  question,
  index,
}: IQuestionCard): ReactElement {
  const { handleChangeScale, handleRemoveQuestion, handleChangeAnswer } =
    useApp();
  const { toggle: visibleModal, handleToggle: toggleModal } = useToggle();
  const { t } = useTranslation();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Fragment>
      <Card
        className="p-4 hw-full flex gap-1 items-center min-h-40 h-40 max-h-40"
        ref={setNodeRef}
        style={style}
      >
        <div className="hw-full flex gap-1 items-center">
          <div {...attributes} {...listeners}>
            <MdDragIndicator
              size={32}
              className="text-gray-400 cursor-pointer"
            />
          </div>
          <Image
            className="rounded-lg pr-4 cursor-pointer hover:brightness-50 transition-all duration-500"
            height={128}
            width={128}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              minWidth: "128px",
              minHeight: "128px",
              maxHeight: "128px",
              maxWidth: "128px",
            }}
            src={question.base64!}
            alt="Question Image"
            onClick={() => toggleModal(true)}
          />
          <SidebarSection
            label={`${t("question")} ${index + 1}`}
            containerClassName="h-full"
            layoutClassName="!flex-row items-start h-full"
          >
            <ButtonGroup label="Answer">
              <>
                {[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "D", value: "D" },
                  { label: "E", value: "E" },
                  { label: t("null"), value: null },
                  { label: "🗑️", value: "🗑️" },
                ].map((option, i) => (
                  <Button
                    variant={
                      question.answer === option.value ? "primary" : "secondary"
                    }
                    isIconOnly
                    key={i}
                    onClick={() => {
                      if (option.value === "🗑️") {
                        return handleRemoveQuestion(index);
                      }
                      handleChangeAnswer(
                        index,
                        option.value as IQuestionAnswer
                      );
                    }}
                    label={option.label}
                  />
                ))}
              </>
            </ButtonGroup>
            <NumberFieldRoot
              value={question.scale}
              onChange={(val) => handleChangeScale(index, val)}
              minValue={0.5}
              maxValue={1.5}
              step={0.1}
            >
              <Label>Scale</Label>
              <NumberFieldGroup>
                <NumberFieldInput />
              </NumberFieldGroup>
            </NumberFieldRoot>
          </SidebarSection>
        </div>
      </Card>
      {visibleModal && (
        <EditorModal
          image={question.base64!}
          onHide={() => toggleModal(false)}
          index={index}
        />
      )}
    </Fragment>
  );
}
