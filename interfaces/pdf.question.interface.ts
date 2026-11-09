export interface IQuestion {
  id: IQuestionId
  base64: IQuestionBase64
  answer: IQuestionAnswer
  width: IQuestionWidth
  height: IQuestionHeight
  scale: IQuestionScale
  ratio: IQuestionRatio
  index?: IQuestionIndex
}

export interface IQuestionImage {
  base64: string
  width: number
  height: number
  ratio: number
}

export type IQuestionId = string
export type IQuestionBase64 = string
export type IQuestionAnswer = 'A' | 'B' | 'C' | 'D' | 'E' | null
export type IQuestionWidth = number
export type IQuestionHeight = number
export type IQuestionScale = number
export type IQuestionRatio = number
export type IQuestionIndex = number
