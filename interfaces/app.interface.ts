export interface IuseApp {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
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
}

export interface IQuestion {
  blob: IQuestionBlob;
  base64: IQuestionBase64;
  answer: IQuestionAnswer;
  width: IQuestionWidth;
  height: IQuestionHeight;
  scale: IQuestionScale;
  ratio: IQuestionRatio;
}

export type IQuestionBlob = string | null;
export type IQuestionBase64 = string | null;
export type IQuestionAnswer = "A" | "B" | "C" | "D" | "E" | null;
export type IQuestionWidth = number;
export type IQuestionHeight = number;
export type IQuestionScale = number;
export type IQuestionRatio = number;
