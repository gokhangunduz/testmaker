'use client'

import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import useApp from '@/hooks/useApp'
import { Button } from '@/ui/Button'
import { IconButton } from '@/ui/IconButton'

export function ExternalChangeBanner(): ReactElement | null {
  const { externalChange } = useApp()
  const { t } = useTranslation()

  if (!externalChange) return null

  return (
    <div
      role="alert"
      className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-warning-subtle px-3 py-2 text-sm text-warning-foreground sm:px-4"
    >
      <p className="min-w-0">{t('externalChange')}</p>
      <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
        {t('reload')}
      </Button>
    </div>
  )
}

export function UndoBar(): ReactElement | null {
  const { undo, handleUndo, dismissUndo } = useApp()
  const { t } = useTranslation()

  if (!undo) return null

  return (
    <div
      role="status"
      className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-foreground px-3 py-2 text-sm text-background sm:px-4"
    >
      <p className="min-w-0">{t(`undo_${undo.kind}`)}</p>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          className="border-transparent bg-background text-foreground hover:bg-background/90 hover:text-foreground"
          autoFocus={undo.kind !== 'reset'}
          onClick={handleUndo}
        >
          {t('undo')}
        </Button>
        <IconButton
          label={t('close')}
          className="text-background hover:bg-background/10 hover:text-background"
          onClick={dismissUndo}
        >
          <X className="size-4" />
        </IconButton>
      </div>
    </div>
  )
}
