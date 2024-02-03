export interface IuseApp {
  questions: Iquestion[];
  setQuestions: React.Dispatch<React.SetStateAction<Iquestion[]>>;
  handleAddQuestion: () => void;
  handleRemoveQuestion: (index: number) => void;
}

export interface Iquestion {
  image: any | null;
  answer: "A" | "B" | "C" | "D" | "E" | null;
}
