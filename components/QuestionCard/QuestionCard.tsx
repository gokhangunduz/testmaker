"use client";

import Image from "next/image";
import {
  IQuestion,
  IQuestionAnswer,
} from "@/interfaces/pdf.question.interface";
import { MdDragIndicator } from "react-icons/md";
import { Fragment, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@nextui-org/card";
import { Button, ButtonGroup, Slider } from "@nextui-org/react";
import useApp from "@/hooks/useApp";
import SidebarSection from "../SidebarSection/SidebarSection";
interface IQuestionCard {
  question: IQuestion;
  index: number;
}

export default function QuestionCard({
  question,
  index,
}: Readonly<IQuestionCard>): ReactElement {
  const { handleChangeScale, handleRemoveQuestion, handleChangeAnswer } =
    useApp();

  const { t } = useTranslation();

  return (
    <Card className="p-4 hw-full flex gap-1 items-center">
      <div className="hw-full flex gap-1 items-center">
        <Image
          className="rounded-lg pr-4"
          height={192}
          width={192}
          style={{
            objectFit: "contain",
            objectPosition: "center",
            minWidth: "192px",
            minHeight: "192px",
            maxHeight: "192px",
            maxWidth: "192px",
          }}
          src={question.base64!}
          alt="Question Image"
        />
        <SidebarSection
          label={`${t("question")} ${index + 1}`}
          containerClassName="h-full"
          layoutClassName="justify-evenly items-start h-full"
        >
          <ButtonGroup>
            <Fragment>
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
                >
                  {option.label}
                </Button>
              ))}
            </Fragment>
          </ButtonGroup>
          <Slider
            label={t("questionScale")}
            step={0.01}
            maxValue={1.5}
            minValue={0.5}
            value={question.scale}
            onChange={(e) => handleChangeScale(index, e as number)}
            className="max-w-sm"
          />
        </SidebarSection>
        <MdDragIndicator size={36} className="text-gray-400 cursor-pointer" />
      </div>
    </Card>
  );
}
