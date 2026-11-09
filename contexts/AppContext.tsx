"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IQuestion,
  IQuestionAnswer,
  IQuestionImage,
  IQuestionScale,
} from "@/interfaces/pdf.question.interface";
import { ISettings } from "@/interfaces/pdf.settings.interface";
import { IUndo, IuseApp } from "@/interfaces/app.hook.interface";
import { pdfInitialSettings } from "@/constants/pdf.initial";
import {
  MAX_SCALE,
  MIN_SCALE,
  PDF_REFRESH_DELAY_MS,
  PROJECT_CHANNEL,
  SAVE_DELAY_MS,
  UNDO_TIMEOUT_MS,
} from "@/configs/config";
import {
  loadProject,
  saveMetaBackup,
  saveProject,
} from "@/functions/storage.function";
import {
  dataUrlToQuestionImage,
  fileToQuestionImage,
  isPdfSafeDataUrl,
} from "@/functions/meta.image.function";

export const AppContext = createContext<IuseApp | null>(null);

interface IUndoEntry {
  kind: IUndo["kind"];
  restore: () => void;
  /** Settings object that must still be current for a "reset" undo to apply. */
  settingsAfter?: ISettings;
}

interface IProjectSnapshot {
  questions: IQuestion[];
  settings: ISettings;
}

function mergeSettings(saved: Partial<ISettings> | undefined): ISettings {
  return {
    details: { ...pdfInitialSettings.details, ...saved?.details },
    answers: { ...pdfInitialSettings.answers, ...saved?.answers },
    colors: { ...pdfInitialSettings.colors, ...saved?.colors },
  };
}

function clampScale(scale: number): number {
  return Number.isFinite(scale)
    ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
    : 1;
}

/**
 * Brings projects saved by older versions up to date: re-encodes images the
 * PDF cannot draw and clamps scales that are no longer allowed.
 */
async function migrateQuestions(
  saved: IQuestion[],
  normalizeAll: boolean
): Promise<{ questions: IQuestion[]; changed: boolean }> {
  let changed = false;

  const migrated = await Promise.all(
    saved.map(async (question) => {
      let next = question;

      if (normalizeAll || !isPdfSafeDataUrl(question.base64)) {
        try {
          next = { ...next, ...(await dataUrlToQuestionImage(question.base64)) };
          changed = true;
        } catch {
          changed = true;
          return null;
        }
      }

      const scale = clampScale(next.scale);
      if (scale !== next.scale) {
        next = { ...next, scale };
        changed = true;
      }

      return next;
    })
  );

  return {
    questions: migrated.filter((q): q is IQuestion => q !== null),
    changed,
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
  const [isRestoring, setRestoring] = useState<boolean>(true);
  const [externalChange, setExternalChange] = useState<boolean>(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<IUndoEntry[]>([]);
  const [pdfSource, setPdfSource] = useState<IProjectSnapshot | null>(null);

  const latest = useRef<IProjectSnapshot>({ questions, settings });
  const baseline = useRef<IProjectSnapshot | null>({ questions, settings });
  const dirty = useRef<boolean>(false);
  const channel = useRef<BroadcastChannel | null>(null);
  const tabId = useRef<string>("");

  useEffect(() => {
    latest.current = { questions, settings };
  }, [questions, settings]);

  // Debounced snapshot the PDF is rendered from.
  useEffect(() => {
    const timeout = setTimeout(
      () => setPdfSource({ questions, settings }),
      PDF_REFRESH_DELAY_MS
    );

    return () => clearTimeout(timeout);
  }, [questions, settings]);

  const isPDFLoading =
    pdfSource?.questions !== questions || pdfSource?.settings !== settings;

  // Restore the saved project.
  useEffect(() => {
    let cancelled = false;

    loadProject().then(async (project) => {
      let restored: IProjectSnapshot | null = null;
      let changed = false;

      if (project && Array.isArray(project.questions)) {
        const migration = await migrateQuestions(
          project.questions,
          Boolean(project.needsNormalization)
        );
        changed = migration.changed;
        restored = {
          questions: migration.questions,
          settings: mergeSettings(project.settings),
        };
      }
      if (cancelled) return;

      if (restored) {
        baseline.current = changed || project?.needsSave ? null : restored;
        setQuestions(restored.questions);
        setSettings(restored.settings);
      }
      setRestoring(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Tell other tabs when this one saves, and stop saving if another tab did.
  useEffect(() => {
    tabId.current = crypto.randomUUID();

    if (typeof BroadcastChannel === "undefined") return;

    const bc = new BroadcastChannel(PROJECT_CHANNEL);
    channel.current = bc;
    bc.onmessage = (event) => {
      if (event.data?.sender !== tabId.current) setExternalChange(true);
    };

    return () => {
      bc.close();
      channel.current = null;
    };
  }, []);

  const flushSave = useCallback(async () => {
    if (!dirty.current) return;

    dirty.current = false;
    const saved = await saveProject(latest.current);

    if (saved) {
      channel.current?.postMessage({ sender: tabId.current });
    } else {
      dirty.current = true;
    }
  }, []);

  // Autosave (debounced) while nothing else has changed the project.
  useEffect(() => {
    if (isRestoring || externalChange) return;

    const base = baseline.current;
    if (base && base.questions === questions && base.settings === settings) {
      return;
    }

    baseline.current = null;
    dirty.current = true;
    saveMetaBackup({ questions, settings });

    const timeout = setTimeout(flushSave, SAVE_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [questions, settings, isRestoring, externalChange, flushSave]);

  // Never lose the last edits when the page is closed or hidden.
  useEffect(() => {
    function handleHide() {
      if (!externalChange) flushSave();
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") handleHide();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handleHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handleHide);
    };
  }, [externalChange, flushSave]);

  // Undo: a small stack, every entry only restores what its own action took.
  const registerUndo = useCallback(
    (entry: IUndoEntry) =>
      setUndoStack((prev) => [...prev.slice(-9), entry]),
    []
  );

  const dismissUndo = useCallback(() => setUndoStack([]), []);

  // A "reset" can only be undone while the settings are still untouched.
  const activeUndo = useMemo(
    () =>
      undoStack.filter(
        (entry) => !entry.settingsAfter || entry.settingsAfter === settings
      ),
    [undoStack, settings]
  );

  const handleUndo = useCallback(() => {
    const top = activeUndo[activeUndo.length - 1];
    if (!top) return;

    top.restore();
    setUndoStack((prev) => prev.filter((entry) => entry !== top));
  }, [activeUndo]);

  useEffect(() => {
    if (activeUndo.length === 0) return;

    const timeout = setTimeout(dismissUndo, UNDO_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [activeUndo, dismissUndo]);

  const undoKind = activeUndo.length
    ? activeUndo[activeUndo.length - 1].kind
    : null;
  const undo = useMemo<IUndo | null>(
    () => (undoKind ? { kind: undoKind } : null),
    [undoKind]
  );

  // Questions.
  const dismissUploadErrors = useCallback(() => setUploadErrors([]), []);

  const handleUploadFiles = useCallback(
    async (files: Iterable<File> | null) => {
      const list = Array.from(files ?? []);
      if (list.length === 0) return;

      const results = await Promise.allSettled(list.map(fileToQuestionImage));
      const loaded: IQuestionImage[] = [];
      const failed: string[] = [];

      results.forEach((result, i) => {
        if (result.status === "fulfilled") loaded.push(result.value);
        else failed.push(list[i].name);
      });

      setUploadErrors(failed);
      if (loaded.length > 0) {
        setQuestions((prev) => [...prev, ...loaded.map(createQuestion)]);
      }
    },
    []
  );

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

  const handleRemoveQuestion = useCallback(
    (id: string) => {
      const current = latest.current.questions;
      const index = current.findIndex((q) => q.id === id);
      if (index < 0) return;

      const removed = current[index];
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      registerUndo({
        kind: "removed",
        restore: () =>
          setQuestions((prev) => {
            if (prev.some((q) => q.id === removed.id)) return prev;

            const next = [...prev];
            next.splice(Math.min(index, next.length), 0, removed);
            return next;
          }),
      });
    },
    [registerUndo]
  );

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

  const handleClearQuestions = useCallback(() => {
    const previous = latest.current.questions;
    if (previous.length === 0) return;

    setQuestions([]);
    registerUndo({
      kind: "cleared",
      restore: () =>
        setQuestions((prev) => {
          const existing = new Set(prev.map((q) => q.id));
          return [...previous.filter((q) => !existing.has(q.id)), ...prev];
        }),
    });
  }, [registerUndo]);

  const handleResetSettings = useCallback(() => {
    const previous = latest.current.settings;

    setSettings(pdfInitialSettings);
    registerUndo({
      kind: "reset",
      restore: () => setSettings(previous),
      settingsAfter: pdfInitialSettings,
    });
  }, [registerUndo]);

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
        prev.map((q) => (q.id === id ? { ...q, scale: clampScale(scale) } : q))
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
      handleUploadFiles,
      uploadErrors,
      dismissUploadErrors,
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
      pdfSource,
      externalChange,
      undo,
      handleUndo,
      dismissUndo,
    }),
    [
      questions,
      settings,
      isPDFLoading,
      isRestoring,
      pdfSource,
      externalChange,
      undo,
      handleUndo,
      dismissUndo,
      handleUploadFiles,
      uploadErrors,
      dismissUploadErrors,
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
