export interface IuseApp {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  handleAddQuestion: (image?: IQuestionImage, answer?: IQuestionAnswer) => void;
  handleChangeQuestion: (index: number, image: string) => void;
  handleChangeAnswer: (index: number, answer: IQuestionAnswer) => void;
  handleRemoveQuestion: (index: number) => void;
  handleOrderQuestion: (oldIndex: number, newIndex: number) => void;
}

export interface IQuestion {
  image: IQuestionImage;
  answer: IQuestionAnswer;
}

export type IQuestionImage = string | undefined;
export type IQuestionAnswer = "A" | "B" | "C" | "D" | "E" | undefined;
