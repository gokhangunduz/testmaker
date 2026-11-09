'use client'

import { ReactNode, useEffect } from 'react'
import i18n from '@/i18n/i18n'
import { getPersistedLanguage } from '@/functions/languagepersistor.function'
import { TooltipProvider } from '@/ui/Tooltip'

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const apply = (lang: string) => {
      document.documentElement.lang = lang
    }

    i18n.on('languageChanged', apply)
    i18n.changeLanguage(getPersistedLanguage())

    return () => i18n.off('languageChanged', apply)
  }, [])

  return <TooltipProvider>{children}</TooltipProvider>
}
