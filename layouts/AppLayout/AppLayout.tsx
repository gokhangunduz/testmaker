"use client";

import { Key, ReactElement, ReactNode, useState } from "react";
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
import useApp from "@/hooks/useApp";

type PaneKey = "questions" | "settings" | "preview";

function Pane({
  active,
  className = "",
  children,
}: {
  active: boolean;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section
      className={`${active ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col xl:flex xl:flex-none ${className}`}
    >
      {children}
    </section>
  );
}

function Workspace(): ReactElement {
  const [pane, setPane] = useState<PaneKey>("questions");
  const { questions } = useApp();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-0 flex-1 flex-col xl:grid xl:grid-cols-[19rem_minmax(26rem,1fr)_minmax(0,1.2fr)]">
      <Tabs
        selectedKey={pane}
        onSelectionChange={(key: Key) => setPane(key as PaneKey)}
        className="shrink-0 border-b border-border bg-surface p-2 xl:hidden"
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Workspace">
            <Tabs.Tab id="questions" className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-3">
              <MdOutlineQuiz size={18} />
              <span>{t("tabQuestions")}</span>
              {questions.length > 0 && (
                <span className="hidden text-xs text-muted sm:inline">
                  {questions.length}
                </span>
              )}
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="settings" className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-3">
              <MdOutlineTune size={18} />
              <span>{t("tabSettings")}</span>
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="preview" className="gap-1.5 px-2 text-sm sm:gap-2 sm:px-3">
              <MdOutlinePictureAsPdf size={18} />
              <span>{t("tabPreview")}</span>
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

      <Pane
        active={pane === "settings"}
        className="overflow-y-auto border-border bg-surface xl:border-r"
      >
        <Sidebar />
      </Pane>
      <Pane
        active={pane === "questions"}
        className="border-border bg-background-secondary xl:border-r"
      >
        <Editor />
      </Pane>
      <Pane active={pane === "preview"}>
        <Preview />
      </Pane>
    </div>
  );
}

export default function AppLayout(): ReactElement {
  return (
    <AppProvider>
      <WelcomeModal />
      <Workspace />
    </AppProvider>
  );
}
