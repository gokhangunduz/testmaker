"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  IQuestion,
  IQuestionAnswer,
  IQuestionImage,
  IQuestionScale,
} from "@/interfaces/pdf.question.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";
import { IuseApp } from "@/interfaces/app.hook.interface";
import { pdfInitialSettings } from "@/constants/pdf.initial";
import { PDF_REFRESH_DELAY_MS, SAVE_DELAY_MS } from "@/configs/config";
import { loadProject, saveProject } from "@/functions/storage.function";

export const AppContext = createContext<IuseApp | null>(null);

function mergeSettings(saved: Partial<ISettings> | undefined): ISettings {
  return {
    details: { ...pdfInitialSettings.details, ...saved?.details },
    answers: { ...pdfInitialSettings.answers, ...saved?.answers },
    colors: { ...pdfInitialSettings.colors, ...saved?.colors },
  };
}

function createQuestion(image: IQuestionImage): IQuestion {
  return {
    id: crypto.randomUUID(),
    base64: image.base64,
    answer: null,
    width: image.width,
    height: image.height,
    ratio: image.ratio,
    scale: 1,
  };
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [settings, setSettings] = useState<ISettings>(pdfInitialSettings);
  const [settled, setSettled] = useState<{
    questions: IQuestion[];
    settings: ISettings;
  } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(
      () => setSettled({ questions, settings }),
      PDF_REFRESH_DELAY_MS
    );

    return () => clearTimeout(timeout);
  }, [questions, settings]);

  const [isRestoring, setRestoring] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    loadProject().then((project) => {
      if (cancelled) return;

      if (project) {
        if (Array.isArray(project.questions)) setQuestions(project.questions);
        setSettings(mergeSettings(project.settings));
      }
      setRestoring(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isRestoring) return;

    const timeout = setTimeout(
      () => saveProject({ questions, settings }),
      SAVE_DELAY_MS
    );

    return () => clearTimeout(timeout);
  }, [questions, settings, isRestoring]);

  const isPDFLoading =
    settled?.questions !== questions || settled?.settings !== settings;

  const handleAddQuestions = useCallback((images: IQuestionImage[]) => {
    setQuestions((prev) => [...prev, ...images.map(createQuestion)]);
  }, []);

  const handleReplaceQuestion = useCallback(
    (id: string, image: IQuestionImage) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                base64: image.base64,
                width: image.width,
                height: image.height,
                ratio: image.ratio,
              }
            : q
        )
      );
    },
    []
  );

  const handleRemoveQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const handleDuplicateQuestion = useCallback((id: string) => {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === id);
      if (index < 0) return prev;

      const next = [...prev];
      next.splice(index + 1, 0, { ...prev[index], id: crypto.randomUUID() });
      return next;
    });
  }, []);

  const handleSetAnswers = useCallback((answers: IQuestionAnswer[]) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i < answers.length ? { ...q, answer: answers[i] } : q))
    );
  }, []);

  const handleClearQuestions = useCallback(() => setQuestions([]), []);

  const handleResetSettings = useCallback(
    () => setSettings(pdfInitialSettings),
    []
  );

  const handleChangeAnswer = useCallback(
    (id: string, answer: IQuestionAnswer) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, answer } : q))
      );
    },
    []
  );

  const handleChangeScale = useCallback(
    (id: string, scale: IQuestionScale) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, scale } : q))
      );
    },
    []
  );

  const handleOrderQuestion = useCallback(
    (activeId: string, overId: string) => {
      setQuestions((prev) => {
        const oldIndex = prev.findIndex((q) => q.id === activeId);
        const newIndex = prev.findIndex((q) => q.id === overId);

        if (oldIndex < 0 || newIndex < 0) return prev;

        const next = [...prev];
        const [moved] = next.splice(oldIndex, 1);
        next.splice(newIndex, 0, moved);
        return next;
      });
    },
    []
  );

  const value = useMemo<IuseApp>(
    () => ({
      questions,
      handleAddQuestions,
      handleReplaceQuestion,
      handleChangeAnswer,
      handleChangeScale,
      handleRemoveQuestion,
      handleDuplicateQuestion,
      handleSetAnswers,
      handleClearQuestions,
      handleResetSettings,
      handleOrderQuestion,
      settings,
      setSettings,
      isPDFLoading,
      isRestoring,
    }),
    [
      questions,
      settings,
      isPDFLoading,
      isRestoring,
      handleAddQuestions,
      handleReplaceQuestion,
      handleChangeAnswer,
      handleChangeScale,
      handleRemoveQuestion,
      handleDuplicateQuestion,
      handleSetAnswers,
      handleClearQuestions,
      handleResetSettings,
      handleOrderQuestion,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
