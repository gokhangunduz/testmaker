"use client";

import {
  IQuestion,
  IQuestionAnswer,
  IQuestionBase64,
  IQuestionBlob,
  IQuestionHeight,
  IQuestionRatio,
  IQuestionScale,
  IQuestionWidth,
} from "@/interfaces/pdf.question.interface";
import React, { createContext, useEffect, useState } from "react";
import mockQuestions from "@/constants/pdf.questions.json";
import initialDetails from "@/constants/pdf.details.json";
import initalSettings from "@/constants/pdf.settings.json";

import { IDetails } from "@/interfaces/pdf.details.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>(
    mockQuestions as IQuestion[]
  );

  const [details, setDetails] = useState<IDetails>(initialDetails as IDetails);

  const [settings, setSettings] = useState<ISettings>(
    initalSettings as ISettings
  );

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  // Questions
  function handleAddQuestion(
    blob: IQuestionBlob,
    base64: IQuestionBase64,
    width: IQuestionWidth,
    height: IQuestionHeight,
    ratio: IQuestionRatio,
    answer?: IQuestionAnswer
  ) {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        blob: blob || null,
        base64: base64 || null,
        answer: answer || null,
        width: width || 0,
        height: height || 0,
        scale: 1,
        ratio: ratio || 0,
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
  function handleChangeScale(index: number, scale: IQuestionScale) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, scale } : q))
    );
  }
  function handleOrderQuestion(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex);
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      const [removed] = newQuestions.splice(oldIndex, 1);
      newQuestions.splice(newIndex, 0, removed);
      return newQuestions;
    });
  }
  // Details
  function handleSetDetails(details: IDetails) {
    setDetails(details);
  }
  // Settings
  function handleSetSettings(settings: ISettings) {
    setSettings(settings);
  }

  return (
    <AppContext.Provider
      value={{
        questions,
        details,
        settings,
        // Questions
        handleAddQuestion,
        handleChangeQuestion,
        handleChangeAnswer,
        handleChangeScale,
        handleRemoveQuestion,
        handleOrderQuestion,
        // Details
        handleSetDetails,
        // Settings
        handleSetSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
