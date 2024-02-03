"use client";

import { Iquestion } from "@/interfaces/app.interface";
import React, { createContext, useState } from "react";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<Iquestion[]>([]);

  function handleAddQuestion() {
    setQuestions([
      ...questions,
      {
        image: null,
        answer: null,
      },
    ]);
  }

  function handleRemoveQuestion(index: number) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,
        handleAddQuestion,
        handleRemoveQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
