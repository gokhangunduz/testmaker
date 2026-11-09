'use client'

import { ReactElement, useState, useSyncExternalStore } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { CONTACT_EMAIL } from '@/configs/config'

const STORAGE_KEY = 'welcome-seen'

function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function rememberWelcome(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // storage unavailable, the welcome just shows again next time
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  return () => window.removeEventListener('storage', onChange)
}

export default function WelcomeModal(): ReactElement | null {
  const seen = useSyncExternalStore(subscribe, hasSeenWelcome, () => true)
  const [dismissed, setDismissed] = useState<boolean>(false)
  const { t } = useTranslation()

  function close() {
    rememberWelcome()
    setDismissed(true)
  }

  if (seen || dismissed) return null

  return (
    <Modal
      open
      onOpenChange={(open) => !open && close()}
      title={t('welcome')}
      footer={<Button onClick={close}>{t('getStarted')}</Button>}
    >
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">{t('projectDescription')}</p>
        <p className="font-semibold">{t('beta')}</p>
        <p className="text-muted-foreground">{t('issues')}</p>
        <p className="text-muted-foreground">
          {t('betaEmail')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </Modal>
  )
}
