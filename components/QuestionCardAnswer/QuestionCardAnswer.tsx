"use client";

import { IQuestionAnswer } from "@/interfaces/pdf.question.interface";
import { SelectButton } from "primereact/selectbutton";
import { useTranslation } from "react-i18next";
import useApp from "@/hooks/useApp";

interface IQuestionCardAnswer {
  index: number;
  answer: IQuestionAnswer;
}

export default function QuestxsionCardAnswer({
  index,
  answer,
}: Readonly<IQuestionCardAnswer>) {
  const { handleChangeAnswer, handleRemoveQuestion } = useApp();

  const { t } = useTranslation();

  return (
    <div className="flex gap-2 items-center">
      <label className="text-base text-zinc-700 font-semibold">
        {t("answer")}:
      </label>
      <SelectButton
        className="flex transition-500"
        value={answer}
        options={[
          { label: "A", value: "A" },
          { label: "B", value: "B" },
          { label: "C", value: "C" },
          { label: "D", value: "D" },
          { label: "E", value: "E" },
          { label: t("null"), value: null },
          { label: "🗑️", value: "🗑️" },
        ]}
        optionLabel="label"
        optionValue="value"
        onChange={(e) => {
          if (e.value === "🗑️") {
            return handleRemoveQuestion(index);
          }

          handleChangeAnswer(index, e.value);
        }}
      />
    </div>
  );
}
