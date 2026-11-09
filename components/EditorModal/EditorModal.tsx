'use client'

import { ReactElement, useRef, useState } from 'react'
import { Cropper, CropperRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'
import { toQuestionImage } from '@/functions/meta.image.function'
import useApp from '@/hooks/useApp'

interface IEditorModal {
  id: string
  title: string
  image: string
  onHide: () => void
}

export default function EditorModal({ id, title, image, onHide }: IEditorModal): ReactElement {
  const { handleReplaceQuestion } = useApp()
  const { t } = useTranslation()

  const ref = useRef<CropperRef>(null)
  const [isReady, setReady] = useState<boolean>(false)

  function handleSave() {
    const canvas = ref.current?.getCanvas()
    if (!canvas) return

    handleReplaceQuestion(
      id,
      toQuestionImage(canvas.toDataURL('image/png'), canvas.width, canvas.height),
    )
    onHide()
  }

  return (
    <Modal
      size="lg"
      open
      onOpenChange={(open) => !open && onHide()}
      title={`${t('editQuestion')} – ${title}`}
      footer={
        <>
          <Button variant="outline" onClick={onHide}>
            {t('cancel')}
          </Button>
          <Button disabled={!isReady} onClick={handleSave}>
            {t('save')}
          </Button>
        </>
      }
    >
      <div className="h-[clamp(8rem,calc(100dvh-16rem),32rem)] w-full overflow-hidden rounded-lg [@media(max-height:500px)]:h-[calc(100dvh-14.5rem)]">
        <Cropper
          ref={ref}
          src={image}
          onReady={() => setReady(true)}
          className="h-full w-full bg-muted"
        />
      </div>
    </Modal>
  )
}
