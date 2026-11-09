'use client'

import { ReactElement, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eraser, ListChecks } from 'lucide-react'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { Textarea } from '@/ui/Textarea'
import QuestionUpload from '../QuestionUpload/QuestionUpload'
import useApp from '@/hooks/useApp'
import { countPages } from '@/functions/pagecount.function'
import { formatAnswerKey, parseAnswerKey } from '@/functions/answerkey.function'

type DialogType = 'answerKey' | 'clear' | null

export default function EditorToolbar(): ReactElement | null {
  const { questions, settings, handleUploadFiles, handleSetAnswers, handleClearQuestions } =
    useApp()
  const { t } = useTranslation()

  const [dialog, setDialog] = useState<DialogType>(null)
  const [answerKey, setAnswerKey] = useState<string>('')

  const pages = useMemo(() => countPages(questions, settings), [questions, settings])

  if (questions.length === 0) return null

  function openAnswerKey() {
    setAnswerKey(formatAnswerKey(questions.map((q) => q.answer)))
    setDialog('answerKey')
  }

  function applyAnswerKey() {
    handleSetAnswers(parseAnswerKey(answerKey))
    setDialog(null)
  }

  function confirmClear() {
    handleClearQuestions()
    setDialog(null)
  }

  return (
    <>
      <div className="z-10 flex shrink-0 flex-col gap-2 border-b border-border bg-card px-3 py-3 sm:px-4 [@media(max-height:500px)]:flex-row [@media(max-height:500px)]:flex-wrap [@media(max-height:500px)]:items-center [@media(max-height:500px)]:justify-between [@media(max-height:500px)]:py-2 [@media(min-height:600px)]:sticky [@media(min-height:600px)]:top-0">
        <div className="flex items-center justify-between gap-2 [@media(max-height:500px)]:contents">
          <p className="min-w-0 text-sm text-muted-foreground [@media(max-height:500px)]:order-1">
            {t('summary', { count: questions.length, pages })}
          </p>
          <Button
            size="sm"
            variant="outline"
            aria-label={t('clearAll')}
            className="shrink-0 text-destructive hover:bg-destructive-subtle hover:text-destructive [@media(max-height:500px)]:order-3"
            onClick={() => setDialog('clear')}
          >
            <Eraser className="size-4" />
            <span className="hidden min-[420px]:inline">{t('clearAll')}</span>
          </Button>
        </div>
        <div className="flex gap-2 [@media(max-height:500px)]:order-2">
          <QuestionUpload
            size="sm"
            className="shrink-0"
            label={t('addImages')}
            handleInputUploader={handleUploadFiles}
          />
          <Button
            size="sm"
            variant="outline"
            title={t('fillAnswerKey')}
            onClick={openAnswerKey}
            className="min-w-0 flex-1 sm:flex-none"
          >
            <ListChecks className="size-4 shrink-0" />
            <span className="truncate">{t('fillAnswerKey')}</span>
          </Button>
        </div>
      </div>

      <Modal
        open={dialog === 'answerKey'}
        onOpenChange={(open) => !open && setDialog(null)}
        title={t('fillAnswerKey')}
        footer={
          <>
            <Button variant="outline" onClick={() => setDialog(null)}>
              {t('cancel')}
            </Button>
            <Button onClick={applyAnswerKey}>{t('apply')}</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{t('answerKeyHint')}</p>
          <Textarea
            aria-label={t('answerKey')}
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
            placeholder={t('answerKeyPlaceholder')}
            rows={4}
            spellCheck={false}
            className="font-mono tracking-widest"
          />
        </div>
      </Modal>

      <Modal
        size="sm"
        open={dialog === 'clear'}
        onOpenChange={(open) => !open && setDialog(null)}
        title={t('clearAllTitle')}
        description={t('clearAllText')}
        footer={
          <>
            <Button variant="outline" onClick={() => setDialog(null)}>
              {t('cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmClear}>
              {t('clearAll')}
            </Button>
          </>
        }
      />
    </>
  )
}
