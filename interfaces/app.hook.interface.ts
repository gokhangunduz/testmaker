import { IDetails } from "./pdf.details.interface";
import {
  IQuestion,
  IQuestionAnswer,
  IQuestionBase64,
  IQuestionBlob,
  IQuestionHeight,
  IQuestionRatio,
  IQuestionScale,
  IQuestionWidth,
} from "./pdf.question.interface";
import { ISettings } from "./pdf.settings.interface";

export interface IuseApp {
  questions: IQuestion[];
  details: IDetails;
  settings: ISettings;
  // Loading
  isPDFLoading: boolean;
  // Questions
  handleAddQuestion(
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
  // Details
  handleSetDetails: (details: IDetails) => void;
  // Settings
  handleSetSettings: (settings: ISettings) => void;
}
