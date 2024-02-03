"use client";

import { IQuestion, IQuestionAnswer } from "@/interfaces/app.interface";
import React, { createContext, useEffect, useState } from "react";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
    {
      image: "img",
      answer: "A",
    },
  ]);

  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  function handleAddQuestion() {
    setQuestions([
      ...questions,
      {
        image: undefined,
        answer: undefined,
      },
    ]);
  }

  function handleRemoveQuestion(index: number) {
    setQuestions(questions.filter((_, i) => i !== index));
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

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,
        handleAddQuestion,
        handleChangeQuestion,
        handleChangeAnswer,
        handleRemoveQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
