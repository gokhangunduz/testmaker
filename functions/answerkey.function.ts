import { IQuestionAnswer } from "@/interfaces/pdf.question.interface";

const VALID_ANSWERS = ["A", "B", "C", "D", "E"];
const EMPTY_MARKS = ["-", "?", "_"];

/**
 * Turns a string such as "ABC-DE" into answers. Letters A-E are answers,
 * "-", "?" and "_" mean "no answer", everything else (spaces, commas,
 * digits) is ignored.
 */
export function parseAnswerKey(input: string): IQuestionAnswer[] {
  const answers: IQuestionAnswer[] = [];

  for (const char of input.toUpperCase()) {
    if (VALID_ANSWERS.includes(char)) {
      answers.push(char as IQuestionAnswer);
    } else if (EMPTY_MARKS.includes(char)) {
      answers.push(null);
    }
  }

  return answers;
}

export function formatAnswerKey(answers: IQuestionAnswer[]): string {
  return answers.map((answer) => answer ?? "-").join("");
}
