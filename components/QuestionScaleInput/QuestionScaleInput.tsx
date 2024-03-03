"use client";

import { IQuestionScale } from "@/interfaces/pdf.question.interface";
import { Button } from "primereact/button";
import useApp from "@/hooks/useApp";
import { useTranslation } from "react-i18next";

interface IQuestionScaleInput {
  index: number;
  scale: IQuestionScale;
}

export default function QuestionScaleInput({
  index,
  scale,
}: IQuestionScaleInput) {
  const { handleChangeScale } = useApp();
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 items-center">
      <label className="text-base text-zinc-700 font-semibold">
        {t("questionScale")}:
      </label>
      <div>
        <Button
          icon="pi pi-minus"
          className="p-button-secondary"
          onClick={() => handleChangeScale(index, scale - 0.1)}
          disabled={scale < 0.2}
        />
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <Button
          icon="pi pi-plus"
          className="p-button-secondary ml-2"
          onClick={() => handleChangeScale(index, scale + 0.1)}
          disabled={scale >= 1.5}
        />
      </div>
    </div>
  );
}
