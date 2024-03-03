"use client";

import Preview from "@/components/Preview/Preview";
import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";
import AppProvider from "@/contexts/AppContext";
import { ReactElement } from "react";

export interface IAppLayout {
  children: ReactElement | ReactElement[];
}

export default function AppLayout({ children }: Readonly<IAppLayout>) {
  return (
    <AppProvider>
      <div
        className="w-full grid grid-cols-12"
        style={{
          height: "calc(100vh - 6rem)",
        }}
      >
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Editor />
        </div>
        <div className="col-span-6">
          <Preview />
        </div>
      </div>
    </AppProvider>
  );
}
