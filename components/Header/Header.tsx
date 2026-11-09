'use client'

import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import { CONTACT_EMAIL } from '@/configs/config'
import { Button } from '@/ui/Button'

export default function Header(): ReactElement {
  const { t } = useTranslation()

  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-3 sm:h-16 sm:px-6 [@media(max-height:500px)]:h-12">
      <Link
        href="/"
        className="flex min-h-11 min-w-11 items-center gap-2 rounded-md text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-xl"
      >
        <Image src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
        <span className="max-[340px]:sr-only">TestMakerLab</span>
      </Link>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <Button asChild aria-label={t('feedback')}>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <Mail className="size-4" />
            <span className="hidden sm:inline">{t('feedback')}</span>
          </a>
        </Button>
      </div>
    </header>
  )
}
