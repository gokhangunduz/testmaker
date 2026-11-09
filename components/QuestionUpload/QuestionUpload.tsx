'use client'

import { ReactElement, useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button, type ButtonProps } from '@/ui/Button'

interface IQuestionUpload {
  label: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  handleInputUploader: (files: Iterable<File> | null) => void
}

export default function QuestionUpload({
  label,
  variant,
  size,
  handleInputUploader,
}: Readonly<IQuestionUpload>): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => inputRef.current?.click()}>
        <ImagePlus className="size-4" />
        {label}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif,.tif,.tiff"
        multiple
        hidden
        tabIndex={-1}
        onChange={(e) => {
          handleInputUploader(e.target.files)
          e.target.value = ''
        }}
      />
    </>
  )
}
