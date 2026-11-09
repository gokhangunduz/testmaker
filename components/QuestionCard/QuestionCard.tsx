'use client'

import { CSSProperties, ReactElement } from 'react'
import Image from 'next/image'
import { Copy, Crop, GripVertical, Trash2 } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTranslation } from 'react-i18next'
import { IQuestion, IQuestionAnswer } from '@/interfaces/pdf.question.interface'
import { MAX_SCALE, MIN_SCALE } from '@/configs/config'
import useApp from '@/hooks/useApp'
import useToggle from '@/hooks/useToggle'
import { Card } from '@/ui/Card'
import { IconButton } from '@/ui/IconButton'
import { segmentChip, segmentGroup } from '@/ui/buttonStyles'
import InputScale from '../InputScale/InputScale'
import EditorModal from '../EditorModal/EditorModal'

interface IQuestionCard {
  question: IQuestion
  index: number
}

const answerOptions: IQuestionAnswer[] = ['A', 'B', 'C', 'D', 'E', null]

export default function QuestionCard({ question, index }: IQuestionCard): ReactElement {
  const { handleChangeScale, handleRemoveQuestion, handleChangeAnswer, handleDuplicateQuestion } =
    useApp()
  const { toggle: visibleModal, handleToggle: toggleModal } = useToggle()
  const { t } = useTranslation()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: question.id,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.85 : 1,
  }

  const title = `${t('question')} ${index + 1}`
  const answerLabel = `${t('answer')} – ${title}`

  return (
    <>
      <Card className="flex w-full shrink-0 flex-col gap-3 p-3" ref={setNodeRef} style={style}>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={`${t('editQuestion')} – ${title}`}
            onClick={() => toggleModal(true)}
            className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-[360px]:h-20 min-[360px]:w-20 sm:h-24 sm:w-24"
          >
            <Image
              className="h-full w-full object-contain"
              height={96}
              width={96}
              src={question.base64}
              alt={title}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Crop className="size-5" />
            </span>
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`${t('reorderQuestion')} – ${title}`}
                className="-my-1 -ml-1.5 shrink-0 cursor-grab touch-none rounded p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-lg:p-2.5"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="size-6" />
              </button>
              <p className="min-w-0 truncate font-medium">{title}</p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div className="w-20 sm:w-24">
                <InputScale
                  label={t('scale')}
                  value={question.scale}
                  min={MIN_SCALE}
                  max={MAX_SCALE}
                  step={0.05}
                  onChange={(value) => handleChangeScale(question.id, value)}
                />
              </div>
              <IconButton
                label={t('duplicateQuestion')}
                variant="outline"
                onClick={() => handleDuplicateQuestion(question.id)}
              >
                <Copy className="size-4" />
              </IconButton>
              <IconButton
                label={t('removeQuestion')}
                variant="outline"
                className="text-destructive hover:bg-destructive-subtle hover:text-destructive"
                onClick={() => handleRemoveQuestion(question.id)}
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">{t('answer')}</span>
          <div role="group" aria-label={answerLabel} className={segmentGroup}>
            {answerOptions.map((option, i) => (
              <button
                key={option ?? 'none'}
                type="button"
                aria-pressed={question.answer === option}
                onClick={() => handleChangeAnswer(question.id, option)}
                className={segmentChip({
                  active: question.answer === option,
                  withDivider: i > 0,
                })}
              >
                {option ?? t('null')}
              </button>
            ))}
          </div>
        </div>
      </Card>
      {visibleModal && (
        <EditorModal
          id={question.id}
          title={title}
          image={question.base64}
          onHide={() => toggleModal(false)}
        />
      )}
    </>
  )
}
