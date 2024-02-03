"use client";

import QuestionsMapper from "../QuestionsMapper/QuestionsMapper";
import { ReactElement } from "react";

export default function Editor(): ReactElement {
  return (
    <div className="bg-blue-300 h-full w-full">
      <QuestionsMapper />
    </div>
  );
}
