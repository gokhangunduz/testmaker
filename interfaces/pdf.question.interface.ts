export interface IQuestion {
  blob: IQuestionBlob;
  base64: IQuestionBase64;
  answer: IQuestionAnswer;
  width: IQuestionWidth;
  height: IQuestionHeight;
  scale: IQuestionScale;
  ratio: IQuestionRatio;
  index?: IQuestionIndex;
}

export type IQuestionBlob = string | null;
export type IQuestionBase64 = string | null;
export type IQuestionAnswer = "A" | "B" | "C" | "D" | "E" | null;
export type IQuestionWidth = number;
export type IQuestionHeight = number;
export type IQuestionScale = number;
export type IQuestionRatio = number;
export type IQuestionIndex = number;
