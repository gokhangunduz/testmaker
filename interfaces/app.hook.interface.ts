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
  handleUploadFiles(files: Iterable<File> | null): Promise<void>;
  hasUploadError: boolean;
  handleReplaceQuestion(id: string, image: IQuestionImage): void;
  handleChangeAnswer(id: string, answer: IQuestionAnswer): void;
  handleChangeScale(id: string, scale: IQuestionScale): void;
  handleRemoveQuestion(id: string): void;
  handleDuplicateQuestion(id: string): void;
  handleSetAnswers(answers: IQuestionAnswer[]): void;
  handleClearQuestions(): void;
  handleResetSettings(): void;
  handleOrderQuestion(activeId: string, overId: string): void;
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
  isPDFLoading: boolean;
  isRestoring: boolean;
}
