import { IQuestion } from "@/interfaces/app.interface";

export function handleParserQuestions(questions: IQuestion[]): IQuestion[][] {
  const nestedArrays: IQuestion[][] = [];
  let currentArray: IQuestion[] = [];

  const isRatioValid = (q: IQuestion[]): boolean =>
    q.reduce((sum, question) => sum + question.ratio * question.scale, 0) <=
    2.75;

  for (const question of questions) {
    if (isRatioValid([...currentArray, question])) {
      currentArray.push(question);
    } else {
      nestedArrays.push([...currentArray]);
      currentArray = [question];
    }
  }

  if (currentArray.length > 0) {
    nestedArrays.push([...currentArray]);
  }

  return nestedArrays;
}
