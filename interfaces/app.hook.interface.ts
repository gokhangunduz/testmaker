import { Dispatch, SetStateAction } from "react";
import {
  IQuestion,
  IQuestionAnswer,
  IQuestionImage,
  IQuestionScale,
} from "./pdf.question.interface";
import { ISettings } from "./pdf.settings.interface";

export interface IuseApp {
  questions: IQuestion[];
  handleAddQuestions(images: IQuestionImage[]): void;
  handleReplaceQuestion(id: string, image: IQuestionImage): void;
  handleChangeAnswer(id: string, answer: IQuestionAnswer): void;
  handleChangeScale(id: string, scale: IQuestionScale): void;
  handleRemoveQuestion(id: string): void;
  handleOrderQuestion(activeId: string, overId: string): void;
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
  isPDFLoading: boolean;
}
