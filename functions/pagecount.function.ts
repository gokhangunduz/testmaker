import { IQuestion } from '@/interfaces/pdf.question.interface'
import { ISettings } from '@/interfaces/pdf.settings.interface'
import { handleMapperPages } from './mapper.pages.function'
import { handleParserQuestions } from './parser.questions.function'

/** Total printed pages, including the answer key page when it is enabled. */
export function countPages(questions: IQuestion[], settings: ISettings): number {
  if (questions.length === 0) return 0

  const questionPages = handleMapperPages(handleParserQuestions(questions)).length

  return settings.answers.isLastPage ? questionPages + 1 : questionPages
}
