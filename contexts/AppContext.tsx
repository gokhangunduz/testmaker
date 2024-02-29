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
import { IDetails } from "@/interfaces/pdf.details.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";
import _debounce from "lodash/debounce";
import {
  pdfInitialDetails,
  pdfInitialQuestions,
  pdfInitialSettings,
} from "@/constants/pdf.initial";

export const AppContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [questions, setQuestions] = useState<IQuestion[]>(pdfInitialQuestions);

  const [details, setDetails] = useState<IDetails>(
    pdfInitialDetails as IDetails
  );
  const [settings, setSettings] = useState<ISettings>(
    pdfInitialSettings as ISettings
  );
  const [isPDFLoading, setPDFLoading] = useState<boolean>(true);

  const logChanges = _debounce(() => {
    setPDFLoading(false);
  }, 3000);

  useEffect(() => {
    !isPDFLoading && setPDFLoading(true);
    logChanges();

    return () => {
      logChanges.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, settings, details]);

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
        // Loading
        isPDFLoading,
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
