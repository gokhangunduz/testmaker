'use client'

import { ReactElement, ReactNode, useState, useSyncExternalStore } from 'react'
import { ClipboardList, FileText, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Preview from '@/components/Preview/Preview'
import Sidebar from '@/components/Sidebar/Sidebar'
import Editor from '@/components/Editor/Editor'
import AppProvider from '@/contexts/AppContext'
import WelcomeModal from '@/components/WelcomeModal/WelcomeModal'
import { ExternalChangeBanner, UndoBar } from '@/components/AppNotices/AppNotices'
import useApp from '@/hooks/useApp'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@/ui/Tabs'

type PaneKey = 'questions' | 'settings' | 'preview'

const WIDE_QUERY = '(min-width: 1024px)'

function subscribeWide(onChange: () => void): () => void {
  const query = window.matchMedia(WIDE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function useIsWide(): boolean {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  )
}

function Pane({
  label,
  visibility,
  className,
  children,
}: {
  label: string
  visibility: string
  className?: string
  children: ReactNode
}): ReactElement {
  return (
    <section
      aria-label={label}
      className={cn(visibility, 'min-h-0 min-w-0 flex-1 flex-col xl:flex xl:flex-none', className)}
    >
      {children}
    </section>
  )
}

function Workspace(): ReactElement {
  const [pane, setPane] = useState<PaneKey>('questions')
  const isWide = useIsWide()
  const { questions } = useApp()
  const { t } = useTranslation()

  // From 1024px the preview is always on screen next to the tabs.
  const selected: PaneKey = isWide && pane === 'preview' ? 'questions' : pane
  const triggerClass = 'flex-1 gap-1.5 px-2 sm:gap-2 sm:px-3'
  // The panes are layout columns, not tab panels, so there is nothing for aria-controls to point at.
  const noControls = { 'aria-controls': undefined }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ExternalChangeBanner />
      <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(24rem,2fr)_3fr] lg:grid-rows-[auto_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(26rem,1fr)_minmax(0,1.2fr)] xl:grid-rows-[minmax(0,1fr)]">
        <Tabs
          value={selected}
          onValueChange={(value) => setPane(value as PaneKey)}
          className="shrink-0 border-b border-border bg-card p-2 lg:col-start-1 lg:row-start-1 lg:border-r xl:hidden [@media(max-height:500px)]:p-1"
        >
          <TabsList aria-label={t('workspace')} className="flex w-full">
            <TabsTrigger value="questions" className={triggerClass} {...noControls}>
              <ClipboardList className="hidden size-4 min-[360px]:block" />
              <span>{t('tabQuestions')}</span>
              {questions.length > 0 && (
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {questions.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className={triggerClass} {...noControls}>
              <SlidersHorizontal className="hidden size-4 min-[360px]:block" />
              <span>{t('tabSettings')}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className={cn(triggerClass, 'lg:hidden')} {...noControls}>
              <FileText className="hidden size-4 min-[360px]:block" />
              <span>{t('tabPreview')}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Pane
          label={t('tabSettings')}
          visibility={selected === 'settings' ? 'flex' : 'hidden'}
          className="overflow-y-auto border-border bg-card lg:col-start-1 lg:row-start-2 lg:border-r xl:col-start-1 xl:row-start-1"
        >
          <Sidebar />
        </Pane>
        <Pane
          label={t('tabQuestions')}
          visibility={selected === 'questions' ? 'flex' : 'hidden'}
          className="border-border bg-background lg:col-start-1 lg:row-start-2 lg:border-r xl:col-start-2 xl:row-start-1"
        >
          <Editor />
        </Pane>
        <Pane
          label={t('tabPreview')}
          visibility={selected === 'preview' ? 'flex' : 'hidden lg:flex'}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:col-start-3 xl:row-span-1"
        >
          <Preview />
        </Pane>
      </div>
      <UndoBar />
    </div>
  )
}

export default function AppLayout(): ReactElement {
  return (
    <AppProvider>
      <h1 className="sr-only">TestMakerLab</h1>
      <WelcomeModal />
      <Workspace />
    </AppProvider>
  )
}
