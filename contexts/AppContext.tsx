"use client";

import {
  IQuestion,
  IQuestionAnswer,
  IQuestionImage,
} from "@/interfaces/app.interface";
import React, { createContext, useEffect, useState } from "react";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
    {
      image: "",
      answer: "C",
    },
  ]);

  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  function handleAddQuestion(image?: IQuestionImage, answer?: IQuestionAnswer) {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        image: image,
        answer: answer,
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
