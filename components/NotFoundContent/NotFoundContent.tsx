'use client'

import { ReactElement } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/Button'

export default function NotFoundContent(): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-10 text-center">
      <p className="text-6xl font-semibold text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold">{t('notFoundTitle')}</h1>
      <p className="max-w-md text-muted-foreground">{t('notFoundText')}</p>
      <Button asChild>
        <Link href="/">{t('backHome')}</Link>
      </Button>
    </div>
  )
}
