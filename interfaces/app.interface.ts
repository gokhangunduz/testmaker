export interface IuseApp {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  handleAddQuestion: (
    blob: IQuestionBlob,
    base64: IQuestionBase64,
    answer?: IQuestionAnswer
  ) => void;
  handleChangeQuestion: (index: number, image: string) => void;
  handleChangeAnswer: (index: number, answer: IQuestionAnswer) => void;
  handleRemoveQuestion: (index: number) => void;
  handleOrderQuestion: (oldIndex: number, newIndex: number) => void;
}

export interface IQuestion {
  blob: IQuestionBlob;
  base64: IQuestionBase64;
  answer: IQuestionAnswer;
}

export type IQuestionBlob = string | null;
export type IQuestionBase64 = string | null;
export type IQuestionAnswer = "A" | "B" | "C" | "D" | "E" | null;
