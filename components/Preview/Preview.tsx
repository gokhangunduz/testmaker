'use client'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import PDFLoading from '../PDFLoading/PDFLoading'

const PDFPanel = dynamic(() => import('../PDFPanel/PDFPanel'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-0 flex-1 flex-col">
      <PDFLoading />
    </div>
  ),
})

export default function Preview(): ReactElement {
  return <PDFPanel />
}
