"use client";

import { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import {
  MdDragIndicator,
  MdDeleteOutline,
  MdContentCopy,
} from "react-icons/md";
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
  const {
    handleChangeScale,
    handleRemoveQuestion,
    handleChangeAnswer,
    handleDuplicateQuestion,
  } = useApp();
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
        className="p-3 w-full shrink-0"
        ref={setNodeRef}
        style={style}
      >
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            aria-label={title}
            className="cursor-grab touch-none text-gray-400"
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator size={28} />
          </button>
          <button
            type="button"
            aria-label={t("editQuestion")}
            onClick={() => toggleModal(true)}
            className="shrink-0"
          >
            <Image
              className="rounded-lg cursor-pointer hover:brightness-50 transition-500"
              height={112}
              width={112}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                width: 112,
                height: 112,
              }}
              src={question.base64}
              alt={title}
            />
          </button>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="font-medium text-zinc-800">{title}</p>
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
            <div className="flex flex-wrap items-end gap-2">
              <div className="w-24">
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
              </div>
              <Button
                variant="secondary"
                isIconOnly
                ariaLabel={t("duplicateQuestion")}
                label={<MdContentCopy size={18} />}
                onClick={() => handleDuplicateQuestion(question.id)}
              />
              <Button
                variant="danger-soft"
                isIconOnly
                ariaLabel={t("removeQuestion")}
                label={<MdDeleteOutline size={20} />}
                onClick={() => handleRemoveQuestion(question.id)}
              />
            </div>
          </div>
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
