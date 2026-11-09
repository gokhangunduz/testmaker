"use client";

import { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import { MdDragIndicator, MdDeleteOutline } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  NumberFieldRoot,
  Label,
  NumberFieldGroup,
  NumberFieldInput,
  Card,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import {
  IQuestion,
  IQuestionAnswer,
} from "@/interfaces/pdf.question.interface";
import useApp from "@/hooks/useApp";
import useToggle from "@/hooks/useToggle";
import SidebarSection from "../SidebarSection/SidebarSection";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import EditorModal from "../EditorModal/EditorModal";

interface IQuestionCard {
  question: IQuestion;
  index: number;
}

const answerOptions: IQuestionAnswer[] = ["A", "B", "C", "D", "E", null];

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

  const title = `${t("question")} ${index + 1}`;

  return (
    <>
      <Card
        className="p-4 hw-full flex gap-1 items-center min-h-40 h-40 max-h-40"
        ref={setNodeRef}
        style={style}
      >
        <div className="hw-full flex gap-1 items-center">
          <button
            type="button"
            aria-label={title}
            className="cursor-grab touch-none text-gray-400"
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator size={32} />
          </button>
          <button
            type="button"
            aria-label={t("editQuestion")}
            onClick={() => toggleModal(true)}
            className="shrink-0"
          >
            <Image
              className="rounded-lg pr-4 cursor-pointer hover:brightness-50 transition-500"
              height={128}
              width={128}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                width: 128,
                height: 128,
              }}
              src={question.base64}
              alt={title}
            />
          </button>
          <SidebarSection
            label={title}
            containerClassName="h-full"
            layoutClassName="!flex-row items-start h-full"
          >
            <ButtonGroup label={t("answer")}>
              {answerOptions.map((option) => (
                <Button
                  key={option ?? "none"}
                  variant={question.answer === option ? "primary" : "secondary"}
                  isIconOnly
                  label={option ?? t("null")}
                  onClick={() => handleChangeAnswer(question.id, option)}
                />
              ))}
            </ButtonGroup>
            <NumberFieldRoot
              value={question.scale}
              onChange={(value) => {
                if (Number.isFinite(value)) {
                  handleChangeScale(question.id, value);
                }
              }}
              minValue={0.5}
              maxValue={1.5}
              step={0.1}
            >
              <Label>{t("questionScale")}</Label>
              <NumberFieldGroup>
                <NumberFieldInput />
              </NumberFieldGroup>
            </NumberFieldRoot>
            <Button
              variant="danger-soft"
              isIconOnly
              ariaLabel={t("removeQuestion")}
              label={<MdDeleteOutline size={20} />}
              onClick={() => handleRemoveQuestion(question.id)}
            />
          </SidebarSection>
        </div>
      </Card>
      {visibleModal && (
        <EditorModal
          id={question.id}
          image={question.base64}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  );
}
