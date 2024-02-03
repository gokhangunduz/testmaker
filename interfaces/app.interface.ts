export interface IuseApp {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  handleAddQuestion: () => void;
  handleChangeQuestion: (index: number, image: string) => void;
  handleChangeAnswer: (index: number, answer: IQuestionAnswer) => void;
  handleRemoveQuestion: (index: number) => void;
}

export interface IQuestion {
  image: IQuestionImage;
  answer: IQuestionAnswer;
}

export type IQuestionImage = any | undefined;
export type IQuestionAnswer = "A" | "B" | "C" | "D" | "E" | undefined;
