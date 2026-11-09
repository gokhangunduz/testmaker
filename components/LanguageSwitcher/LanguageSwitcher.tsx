'use client'

import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { languageNames } from '@/constants/language.viewer.constant'
import { persistLanguage } from '@/functions/languagepersistor.function'
import { ILanguages, LANGUAGES } from '@/interfaces/i18n.interface'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/Select'

export default function LanguageSwitcher(): ReactElement {
  const { i18n, t } = useTranslation()

  function handleChange(value: string) {
    const lang = value as ILanguages
    i18n.changeLanguage(lang)
    persistLanguage(lang)
  }

  return (
    <Select value={i18n.resolvedLanguage} onValueChange={handleChange}>
      <SelectTrigger aria-label={t('language')} className="w-28 sm:w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageNames[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
