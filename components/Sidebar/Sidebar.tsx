'use client'

import { ReactElement } from 'react'
import { RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SidebarSection from '../SidebarSection/SidebarSection'
import InputColor from '../InputColor/InputColor'
import useApp from '@/hooks/useApp'
import { ISettings } from '@/interfaces/pdf.settings.interface'
import { Button } from '@/ui/Button'
import { Switch } from '@/ui/Switch'
import { TextInput } from '@/ui/TextInput'

type ColorKey = keyof ISettings['colors']

const colorFields: { key: ColorKey; label: string }[] = [
  { key: 'border', label: 'lineColor' },
  { key: 'title', label: 'titleColor' },
  { key: 'subtitle', label: 'subtitleColor' },
  { key: 'questionNumber', label: 'questionNumberColor' },
  { key: 'pageNumber', label: 'pageNumberColor' },
  { key: 'pageAnswer', label: 'pageAnswerColor' },
]

export default function Sidebar(): ReactElement {
  const { settings, setSettings, handleResetSettings } = useApp()
  const { t } = useTranslation()

  const setDetail = (key: keyof ISettings['details'], value: string) =>
    setSettings((prev) => ({
      ...prev,
      details: { ...prev.details, [key]: value },
    }))

  const setAnswer = (key: keyof ISettings['answers'], value: boolean) =>
    setSettings((prev) => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }))

  const setColor = (key: ColorKey, value: string) =>
    setSettings((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }))

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-8 p-4 sm:p-6 xl:max-w-none">
      <SidebarSection label={t('titles')} gap={4}>
        <TextInput
          label={t('title')}
          placeholder={t('titlePlaceholder')}
          maxLength={80}
          value={settings.details.title}
          onChange={(e) => setDetail('title', e.target.value)}
        />
        <TextInput
          label={t('subtitle')}
          placeholder={t('subtitlePlaceholder')}
          maxLength={120}
          value={settings.details.subtitle}
          onChange={(e) => setDetail('subtitle', e.target.value)}
        />
      </SidebarSection>

      <SidebarSection label={t('answerKeys')}>
        <Switch
          labelClassName="min-h-11 w-full flex-row-reverse justify-between gap-3"
          checked={settings.answers.isPerPage}
          onCheckedChange={(value) => setAnswer('isPerPage', value)}
        >
          {t('isPerPageAnswers')}
        </Switch>
        <Switch
          labelClassName="min-h-11 w-full flex-row-reverse justify-between gap-3"
          checked={settings.answers.isLastPage}
          onCheckedChange={(value) => setAnswer('isLastPage', value)}
        >
          {t('isLastPageAnswers')}
        </Switch>
      </SidebarSection>

      <SidebarSection label={t('colors')}>
        {colorFields.map(({ key, label }) => (
          <InputColor
            key={key}
            label={t(label)}
            color={settings.colors[key]}
            onChange={(value) => setColor(key, value)}
          />
        ))}
      </SidebarSection>

      <div className="flex flex-col gap-3">
        <Button variant="outline" onClick={handleResetSettings} className="w-full">
          <RotateCcw className="size-4" />
          {t('resetSettings')}
        </Button>
        <p className="text-xs text-muted-foreground">{t('projectSaved')}</p>
      </div>
    </div>
  )
}
