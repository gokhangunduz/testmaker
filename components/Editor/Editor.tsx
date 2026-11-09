"use client";

import { ReactElement } from "react";
import DnDProvider from "../DnDProvider/DnDProvider";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import QuestionUploader from "../QuestionUploader/QuestionUploader";

export default function Editor(): ReactElement {
  return (
    <QuestionUploader>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <EditorToolbar />
        <DnDProvider />
      </div>
    </QuestionUploader>
  );
}
