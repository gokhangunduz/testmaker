'use client'

import { ReactElement } from 'react'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PDFEmpty(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
      <FileText className="size-12 text-muted-foreground" />
      <p>{t('pdfEmpty')}</p>
    </div>
  )
}
