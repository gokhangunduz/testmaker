export const LANGUAGES = ['tr', 'en', 'de'] as const

export type ILanguages = (typeof LANGUAGES)[number]
