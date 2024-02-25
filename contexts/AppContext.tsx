"use client";

import {
  IQuestion,
  IQuestionAnswer,
  IQuestionBase64,
  IQuestionBlob,
} from "@/interfaces/app.interface";
import React, { createContext, useEffect, useState } from "react";
import mockQuestions from "@/mocks/questions.json";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>([
    ...mockQuestions,
    ...mockQuestions,
  ] as IQuestion[]);

  useEffect(() => {
    console.log(questions?.[0]?.base64);
  }, [questions]);

  function handleAddQuestion(
    blob: IQuestionBlob,
    base64: IQuestionBase64,
    answer?: IQuestionAnswer
  ) {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        blob: blob || null,
        base64: base64 || null,
        answer: answer || null,
        width: 0,
        height: 0,
        scale: 1,
        ratio: 0,
      },
    ]);
  }

  function handleRemoveQuestion(index: number) {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  }

  function handleChangeQuestion(index: number, image: string) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, image } : q))
    );
  }

  function handleChangeAnswer(index: number, answer: IQuestionAnswer) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, answer } : q))
    );
  }

  function handleOrderQuestion(oldIndex: number, newIndex: number) {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const [removed] = newQuestions.splice(oldIndex, 1);
      newQuestions.splice(newIndex, 0, removed);
      return newQuestions;
    });
  }

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,
        handleAddQuestion,
        handleChangeQuestion,
        handleChangeAnswer,
        handleRemoveQuestion,
        handleOrderQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
