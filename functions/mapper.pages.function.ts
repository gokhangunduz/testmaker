import { IQuestion } from "@/interfaces/pdf.question.interface";

export function handleMapperPages(questions: IQuestion[][]): IQuestion[][][] {
  const pages = [];

  for (let i = 0; i < questions.length; i += 2) {
    pages.push([questions[i] || [], questions[i + 1] || []]);
  }

  return pages;
}
