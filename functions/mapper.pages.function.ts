import { IQuestion } from "@/interfaces/pdf.question.interface";

export function handleMapperPages(columns: IQuestion[][]): IQuestion[][][] {
  const pages: IQuestion[][][] = [];

  for (let i = 0; i < columns.length; i += 2) {
    pages.push([columns[i] ?? [], columns[i + 1] ?? []]);
  }

  return pages;
}
