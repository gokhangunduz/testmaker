"use client";

import {
  Key,
  ReactElement,
  ReactNode,
  useState,
  useSyncExternalStore,
} from "react";
import { Tabs } from "@heroui/react";
import { useTranslation } from "react-i18next";
import {
  MdOutlinePictureAsPdf,
  MdOutlineQuiz,
  MdOutlineTune,
} from "react-icons/md";
import Preview from "@/components/Preview/Preview";
import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";
import AppProvider from "@/contexts/AppContext";
import WelcomeModal from "@/components/WelcomeModal/WelcomeModal";
import {
  ExternalChangeBanner,
  UndoBar,
} from "@/components/AppNotices/AppNotices";
import useApp from "@/hooks/useApp";

type PaneKey = "questions" | "settings" | "preview";

const WIDE_QUERY = "(min-width: 1024px)";

function subscribeWide(onChange: () => void): () => void {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsWide(): boolean {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false
  );
}

function Pane({
  visibility,
  className = "",
  children,
}: {
  visibility: string;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section
      className={`${visibility} min-h-0 min-w-0 flex-1 flex-col xl:flex xl:flex-none ${className}`}
    >
      {children}
    </section>
  );
}

function Workspace(): ReactElement {
  const [pane, setPane] = useState<PaneKey>("questions");
  const isWide = useIsWide();
  const { questions } = useApp();
  const { t } = useTranslation();

  // From 1024px the preview is always on screen next to the tabs.
  const selected: PaneKey = isWide && pane === "preview" ? "questions" : pane;
  const tabClass =
    "min-h-10 gap-1.5 px-2 text-sm sm:gap-2 sm:px-3 [@media(max-height:500px)]:min-h-9";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ExternalChangeBanner />
      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(24rem,2fr)_3fr] lg:grid-rows-[auto_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(26rem,1fr)_minmax(0,1.2fr)] xl:grid-rows-[minmax(0,1fr)]">
        <Tabs
          selectedKey={selected}
          onSelectionChange={(key: Key) => setPane(key as PaneKey)}
          className="shrink-0 border-b border-border bg-surface p-2 lg:col-start-1 lg:row-start-1 lg:border-r xl:hidden [@media(max-height:500px)]:p-1"
        >
          <Tabs.List aria-label={t("workspace")}>
            <Tabs.Tab id="questions" className={tabClass}>
              <MdOutlineQuiz size={18} className="hidden min-[360px]:block" />
              <span>{t("tabQuestions")}</span>
              {questions.length > 0 && (
                <span className="hidden text-xs text-muted sm:inline">
                  {questions.length}
                </span>
              )}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="settings" className={tabClass}>
              <MdOutlineTune size={18} className="hidden min-[360px]:block" />
              <span>{t("tabSettings")}</span>
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="preview" className={`${tabClass} lg:hidden`}>
              <MdOutlinePictureAsPdf
                size={18}
                className="hidden min-[360px]:block"
              />
              <span>{t("tabPreview")}</span>
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Pane
          visibility={selected === "settings" ? "flex" : "hidden"}
          className="overflow-y-auto border-border bg-surface lg:col-start-1 lg:row-start-2 lg:border-r xl:col-start-1 xl:row-start-1"
        >
          <Sidebar />
        </Pane>
        <Pane
          visibility={selected === "questions" ? "flex" : "hidden"}
          className="border-border bg-background-secondary lg:col-start-1 lg:row-start-2 lg:border-r xl:col-start-2 xl:row-start-1"
        >
          <Editor />
        </Pane>
        <Pane
          visibility={selected === "preview" ? "flex" : "hidden lg:flex"}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:col-start-3 xl:row-span-1"
        >
          <Preview />
        </Pane>
      </div>
      <UndoBar />
    </div>
  );
}

export default function AppLayout(): ReactElement {
  return (
    <AppProvider>
      <h1 className="sr-only">TestMakerLab</h1>
      <WelcomeModal />
      <Workspace />
    </AppProvider>
  );
}
