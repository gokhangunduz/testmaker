"use client";

import QuestionUploader from "../QuestionUploader/QuestionUploader";
import QuestionsMapper from "../QuestionsMapper/QuestionsMapper";
import { ReactElement } from "react";

export default function Editor(): ReactElement {
  return (
    <QuestionUploader>
      <QuestionsMapper />
    </QuestionUploader>
  );
}
