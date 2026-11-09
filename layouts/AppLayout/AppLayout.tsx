"use client";

import { ReactElement } from "react";
import Preview from "@/components/Preview/Preview";
import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";
import AppProvider from "@/contexts/AppContext";
import WelcomeModal from "@/components/WelcomeModal/WelcomeModal";

export default function AppLayout(): ReactElement {
  return (
    <AppProvider>
      <WelcomeModal />
      <div className="app-grid w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-2 overflow-auto">
          <Sidebar />
        </div>
        <div className="lg:col-span-4 min-h-96">
          <Editor />
        </div>
        <div className="lg:col-span-6 min-h-96">
          <Preview />
        </div>
      </div>
    </AppProvider>
  );
}
