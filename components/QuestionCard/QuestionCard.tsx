"use client";

import { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import {
  MdContentCopy,
  MdDeleteOutline,
  MdDragIndicator,
  MdOutlineCrop,
} from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  Label,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldRoot,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import {
  IQuestion,
  IQuestionAnswer,
} from "@/interfaces/pdf.question.interface";
import { MAX_SCALE, MIN_SCALE } from "@/configs/config";
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
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.85 : 1,
  };

  const title = `${t("question")} ${index + 1}`;

  return (
    <>
      <Card className="w-full shrink-0 gap-3 p-3" ref={setNodeRef} style={style}>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={`${t("reorderQuestion")} – ${title}`}
            className="-m-1 shrink-0 cursor-grab touch-none rounded p-1.5 text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator size={26} />
          </button>

          <button
            type="button"
            aria-label={`${t("editQuestion")} – ${title}`}
            onClick={() => toggleModal(true)}
            className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-default focus-visible:outline-2 focus-visible:outline-accent sm:h-24 sm:w-24"
          >
            <Image
              className="h-full w-full object-contain"
              height={96}
              width={96}
              src={question.base64}
              alt={title}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <MdOutlineCrop size={24} />
            </span>
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="truncate font-medium">{title}</p>
            <div className="flex items-end gap-2">
              <div className="w-20 sm:w-24">
                <NumberFieldRoot
                  value={question.scale}
                  onChange={(value) => {
                    if (Number.isFinite(value)) {
                      handleChangeScale(question.id, value);
                    }
                  }}
                  minValue={MIN_SCALE}
                  maxValue={MAX_SCALE}
                  step={0.05}
                  formatOptions={{ maximumFractionDigits: 2 }}
                >
                  <Label>{t("scale")}</Label>
                  <NumberFieldGroup>
                    <NumberFieldInput />
                  </NumberFieldGroup>
                </NumberFieldRoot>
              </div>
              <Button
                variant="secondary"
                isIconOnly
                tooltip={t("duplicateQuestion")}
                icon={<MdContentCopy size={18} />}
                onClick={() => handleDuplicateQuestion(question.id)}
              />
              <Button
                variant="danger-soft"
                isIconOnly
                tooltip={t("removeQuestion")}
                icon={<MdDeleteOutline size={20} />}
                onClick={() => handleRemoveQuestion(question.id)}
              />
            </div>
          </div>
        </div>

        <ButtonGroup label={t("answer")} ariaLabel={`${t("answer")} – ${title}`}>
          {answerOptions.map((option) => (
            <Button
              key={option ?? "none"}
              variant={question.answer === option ? "primary" : "secondary"}
              pressed={question.answer === option}
              label={option ?? t("null")}
              onClick={() => handleChangeAnswer(question.id, option)}
              className="flex-1"
            />
          ))}
        </ButtonGroup>
      </Card>
      {visibleModal && (
        <EditorModal
          id={question.id}
          title={title}
          image={question.base64}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  );
}
