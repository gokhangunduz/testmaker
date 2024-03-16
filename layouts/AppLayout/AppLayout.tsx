"use client";

import Preview from "@/components/Preview/Preview";
import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";
import AppProvider from "@/contexts/AppContext";
import { ReactElement, useEffect } from "react";
import WelcomeModal from "@/components/WelcomeModal/WelcomeModal";
import { disableDevTools } from "@/functions/devtools.function";

export interface IAppLayout {
  children: ReactElement | ReactElement[];
}

export default function AppLayout({ children }: Readonly<IAppLayout>) {
  useEffect(() => {
    disableDevTools();
  }, []);

  return (
    <AppProvider>
      <WelcomeModal />
      <div
        className="w-full grid grid-cols-12"
        style={{
          height: "calc(100vh - 6rem)",
        }}
      >
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <Editor />
        </div>
        <div className="col-span-5">
          <Preview />
        </div>
      </div>
    </AppProvider>
  );
}
