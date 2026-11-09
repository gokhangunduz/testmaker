'use client'

import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePDF } from '@react-pdf/renderer'
import { CircleAlert, Download, ExternalLink } from 'lucide-react'
import PDF from '../PDF/PDF'
import PDFEmpty from '../PDFEmpty/PDFEmpty'
import PDFLoading from '../PDFLoading/PDFLoading'
import useApp from '@/hooks/useApp'
import { countPages } from '@/functions/pagecount.function'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/Button'
import { Spinner } from '@/ui/Spinner'
import { buttonVariants } from '@/ui/Button.variants'

const MAX_FILE_NAME_LENGTH = 80

function toFileName(title: string): string {
  const safe = title
    .trim()
    .replace(/[^\p{L}\p{N}_-]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_FILE_NAME_LENGTH)

  return `${safe || 'test'}.pdf`
}

/**
 * The whole preview column. The PDF is generated once and shared by the
 * viewer and the download link, and the previous version stays on screen
 * while the next one is being rendered.
 */
export default function PDFPanel(): ReactElement {
  const { questions, settings, pdfSource, isPDFLoading, isRestoring } = useApp()
  const { t } = useTranslation()
  const [instance, update] = usePDF()
  const renderCount = useRef<number>(0)
  const [shownUrl, setShownUrl] = useState<string | null>(null)

  useEffect(() => {
    if (pdfSource && pdfSource.questions.length > 0) {
      // A fresh key rebuilds the document tree from scratch. Updating the
      // long-lived renderer in place mishandles reordered, keyed children.
      renderCount.current += 1
      update(
        <PDF
          key={renderCount.current}
          questions={pdfSource.questions}
          settings={pdfSource.settings}
          answersTitle={t('answerKey')}
        />,
      )
    }
  }, [pdfSource, t, update])

  const pages = useMemo(() => countPages(questions, settings), [questions, settings])

  const isEmpty = questions.length === 0 && !isRestoring
  const isUpdating = isPDFLoading || instance.loading
  const canDownload = Boolean(instance.url) && !isUpdating && !isEmpty
  const href = canDownload ? (instance.url ?? undefined) : undefined
  const disabledLink = canDownload ? '' : 'pointer-events-none opacity-50'

  function renderBody(): ReactElement {
    if (isEmpty) return <PDFEmpty />

    if (instance.error) {
      return (
        <div
          role="alert"
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
        >
          <CircleAlert className="size-10 text-destructive" />
          <p>{t('pdfError')}</p>
        </div>
      )
    }

    if (!instance.url) return <PDFLoading />

    const nextUrl = instance.url
    const visibleUrl = shownUrl ?? nextUrl
    const urls = Array.from(
      new Set([shownUrl, nextUrl].filter((url): url is string => Boolean(url))),
    )

    // The previous PDF stays visible until the new one has finished loading.
    return (
      <>
        {urls.map((url) => (
          <iframe
            key={url}
            src={`${url}#navpanes=0`}
            title={t('preview')}
            aria-hidden={url !== visibleUrl}
            onLoad={() => {
              if (url === nextUrl) setShownUrl(url)
            }}
            className={cn(
              'absolute inset-0 h-full w-full border-0',
              url === visibleUrl ? 'z-10' : 'pointer-events-none opacity-0',
            )}
          />
        ))}
      </>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-3 sm:px-4">
        <div className="min-w-0">
          <h2 className="truncate font-medium">{t('preview')}</h2>
          {pages > 0 && (
            <p className="text-xs text-muted-foreground">{t('pagesCount', { count: pages })}</p>
          )}
        </div>
        {!isEmpty && (
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              aria-label={t('openPdf')}
              title={t('openPdf')}
              className={disabledLink}
            >
              <a href={href} target="_blank" rel="noopener" aria-disabled={!canDownload}>
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <a
              href={href}
              download={toFileName(settings.details.title)}
              aria-label={t('downloadPdf')}
              aria-disabled={!canDownload}
              className={cn(buttonVariants({ size: 'sm' }), disabledLink)}
            >
              {isUpdating ? (
                <Spinner size="sm" className="text-primary-foreground" />
              ) : (
                <Download className="size-4" />
              )}
              <span className="hidden min-[400px]:inline">{t('downloadPdf')}</span>
            </a>
          </div>
        )}
      </div>
      <div className="relative min-h-0 flex-1 bg-muted">
        {renderBody()}
        {isUpdating && instance.url && !isEmpty && (
          <div
            role="status"
            className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs shadow-md"
          >
            <Spinner size="sm" />
            {t('pdfLoading')}
          </div>
        )}
      </div>
    </div>
  )
}
