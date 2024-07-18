import React, { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IQuestion,
  IQuestionAnswer,
} from "@/interfaces/pdf.question.interface";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/react";
import useApp from "@/hooks/useApp";
import SidebarSection from "../SidebarSection/SidebarSection";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

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
    <Card
      className="p-4 hw-full flex gap-1 items-center min-h-40 h-40 max-h-40"
      ref={setNodeRef}
      style={style}
    >
      <div className="hw-full flex gap-1 items-center">
        <div {...attributes} {...listeners}>
          <MdDragIndicator size={32} className="text-gray-400 cursor-pointer" />
        </div>
        <Image
          className="rounded-lg pr-4"
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
                  color={
                    question.answer === option.value ? "primary" : "default"
                  }
                  isIconOnly
                  key={i}
                  onClick={() => {
                    if (option.value === "🗑️") {
                      return handleRemoveQuestion(index);
                    }
                    handleChangeAnswer(index, option.value as IQuestionAnswer);
                  }}
                  label={option.label}
                />
              ))}
            </>
          </ButtonGroup>
          <Input
            type="number"
            label="Scale"
            placeholder="0.00"
            labelPlacement="outside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">Scale</span>
              </div>
            }
            step={0.1}
            max={1.5}
            min={0.5}
            value={String(question.scale)}
            onChange={(e) => {
              handleChangeScale(index, e.target.valueAsNumber as number);
            }}
          />
        </SidebarSection>
      </div>
    </Card>
  );
}
