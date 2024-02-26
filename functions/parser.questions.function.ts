import { IQuestion } from "@/interfaces/app.interface";

export function handleParserQuestions(questions: IQuestion[]): IQuestion[][] {
  const nestedArrays: IQuestion[][] = [];
  let currentArray: IQuestion[] = [];
  let currentIndex = 0; // Eklenen index'i burada saklayalım

  const isRatioValid = (q: IQuestion[]): boolean =>
    q.reduce((sum, question) => sum + question.ratio * question.scale, 0) <=
    2.5;

  for (const question of questions) {
    if (isRatioValid([...currentArray, question])) {
      currentArray.push({ ...question, index: currentIndex++ });
    } else {
      nestedArrays.push([...currentArray]);
      currentArray = [{ ...question, index: currentIndex++ }];
    }
  }

  if (currentArray.length > 0) {
    nestedArrays.push([...currentArray]);
  }

  return nestedArrays;
}
