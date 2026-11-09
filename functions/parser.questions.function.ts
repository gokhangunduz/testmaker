import { IQuestion } from '@/interfaces/pdf.question.interface'
import { MAX_COLUMN_RATIO } from '@/configs/config'

function columnRatio(column: IQuestion[]): number {
  return column.reduce((sum, q) => sum + q.ratio * q.scale, 0)
}

export function handleParserQuestions(questions: IQuestion[]): IQuestion[][] {
  const columns: IQuestion[][] = []
  let current: IQuestion[] = []

  questions.forEach((question, index) => {
    const indexed = { ...question, index }

    if (current.length > 0 && columnRatio([...current, indexed]) > MAX_COLUMN_RATIO) {
      columns.push(current)
      current = []
    }

    current.push(indexed)
  })

  if (current.length > 0) {
    columns.push(current)
  }

  return columns
}
