import React, { ReactElement } from "react";
import DnDProvider from "../DnDProvider/DnDProvider";
import QuestionUploader from "../QuestionUploader/QuestionUploader";

export default function Editor(): ReactElement {
  return (
    <QuestionUploader>
      <DnDProvider />
    </QuestionUploader>
  );
}
