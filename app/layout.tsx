import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import I18nProvider from '@/components/I18nProvider/I18nProvider'
import '@fontsource-variable/inter'
import '@/styles/global.css'

export const metadata: Metadata = {
  title: 'TestMakerLab',
  description:
    'TestMakerLab is a tool developed specifically for professionals and educators who prepare educational materials. It facilitates the quick and efficient conversion of image-based questions into PDF files.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f6f7fa',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex h-dvh flex-col overflow-hidden pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
        <I18nProvider>
          <Header />
          <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
