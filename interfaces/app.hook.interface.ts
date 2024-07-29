import { Dispatch, SetStateAction } from "react";
import {
  IQuestion,
  IQuestionAnswer,
  IQuestionBase64,
  IQuestionBlob,
  IQuestionHeight,
  IQuestionIndex,
  IQuestionRatio,
  IQuestionScale,
  IQuestionWidth,
} from "./pdf.question.interface";
import { ISettings } from "./pdf.settings.interface";

export interface IuseApp {
  // Questions
  questions: IQuestion[];
  handleAddQuestion(
    blob: IQuestionBlob,
    base64: IQuestionBase64,
    width: IQuestionWidth,
    height: IQuestionHeight,
    ratio: IQuestionRatio,
    answer?: IQuestionAnswer
  ): void;
  handleReplaceQuestion(
    index: IQuestionIndex,
    blob: IQuestionBlob,
    base64: IQuestionBase64,
    width: IQuestionWidth,
    height: IQuestionHeight,
    ratio: IQuestionRatio,
    answer?: IQuestionAnswer
  ): void;
  handleChangeQuestion: (index: number, image: string) => void;
  handleChangeAnswer: (index: number, answer: IQuestionAnswer) => void;
  handleChangeScale(index: number, scale: IQuestionScale): void;
  handleRemoveQuestion: (index: number) => void;
  handleOrderQuestion: (oldIndex: number, newIndex: number) => void;
  // Settings
  settings: ISettings;
  setSettings: Dispatch<SetStateAction<ISettings>>;
  // Loading
  isPDFLoading: boolean;
}
