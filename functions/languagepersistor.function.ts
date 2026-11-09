import { ILanguages, LANGUAGES } from '@/interfaces/i18n.interface'

const STORAGE_KEY = 'lang'

export function getPersistedLanguage(): ILanguages {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored as ILanguages) ? (stored as ILanguages) : 'en'
  } catch {
    return 'en'
  }
}

export function persistLanguage(lang: ILanguages): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // storage unavailable, the choice just won't survive a reload
  }
}
