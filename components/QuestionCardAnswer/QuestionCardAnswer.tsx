"use client";

import useApp from "@/hooks/useApp";
import { IQuestionAnswer } from "@/interfaces/app.interface";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Radio } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";

interface IQuestionCardAnswer {
  index: number;
  answer: IQuestionAnswer;
}

export default function QuestionCardAnswer({
  index,
  answer,
}: Readonly<IQuestionCardAnswer>) {
  const { handleChangeAnswer, handleRemoveQuestion } = useApp();

  return (
    <Radio.Group
      className="animate__animated animate__fadeIn animate__delay-1s"
      value={answer}
      onChange={(e) => {
        if (e.target.value === "🗑️") {
          handleRemoveQuestion(index);
        } else {
          handleChangeAnswer(index, e.target.value);
        }
      }}
    >
      {["A", "B", "C", "D", "E", undefined, "🗑️"].map((option, index) => (
        <Radio.Button key={index} value={option}>
          {option || "N/A"}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}
