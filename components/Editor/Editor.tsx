import { ReactElement } from "react";
import DnDProvider from "../DnDProvider/DnDProvider";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import QuestionUploader from "../QuestionUploader/QuestionUploader";

export default function Editor(): ReactElement {
  return (
    <QuestionUploader>
      <div className="flex h-full flex-col">
        <EditorToolbar />
        <DnDProvider />
      </div>
    </QuestionUploader>
  );
}
