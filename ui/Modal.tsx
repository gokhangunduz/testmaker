import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'

const sizeClass: Record<ModalSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  full: 'sm:max-w-[95vw]',
}

const FIELD_SELECTOR =
  'input:not([type=hidden]):not(:disabled), textarea:not(:disabled), select:not(:disabled)'

/**
 * Open focus: the first text field (with its content selected so typing replaces it), otherwise
 * the first footer action, which is the safe choice in a confirm dialog. On touch screens nothing
 * is focused automatically, so the on-screen keyboard does not cover the dialog.
 */
function focusOnOpen(event: Event) {
  const content = event.currentTarget as HTMLElement | null
  if (!content || window.matchMedia('(pointer: coarse)').matches) return

  const target =
    content.querySelector<HTMLElement>(FIELD_SELECTOR) ??
    content.querySelector<HTMLElement>('[data-modal-footer] button')
  if (!target) return

  event.preventDefault()
  target.focus()
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) target.select()
}

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  className?: string
  bodyClassName?: string
}

/**
 * Dialog built on Radix. On a phone it is nearly full width and never taller than the visible
 * viewport; the body scrolls and the header/footer stay put.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
  bodyClassName,
}: ModalProps) {
  const { t } = useTranslation()
  const hasDescription = React.Children.toArray(description).length > 0
  const hasChildren = React.Children.toArray(children).length > 0
  const hasContent = hasDescription || hasChildren

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onOpenAutoFocus={focusOnOpen}
          {...(hasDescription ? {} : { 'aria-describedby': undefined })}
          className={cn(
            'fixed left-[50%] top-[50%] z-50 flex w-[calc(100%-1.5rem)] translate-x-[-50%] translate-y-[-50%] flex-col',
            sizeClass[size],
            'max-h-[calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] sm:max-h-[90dvh]',
            'overflow-hidden rounded-2xl border border-border/50 bg-card p-0 shadow-2xl duration-300',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className,
          )}
        >
          <div
            className={cn(
              'flex shrink-0 flex-col px-4 pb-5 pr-14 pt-6 sm:px-6 [@media(max-height:500px)]:pb-3 [@media(max-height:500px)]:pt-4',
              hasContent && 'border-b border-border/60',
            )}
          >
            <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight [@media(max-height:500px)]:text-base">
              {title}
            </DialogPrimitive.Title>
          </div>
          {hasContent ? (
            <div
              tabIndex={0}
              className={cn(
                'flex-1 overflow-y-auto px-4 py-5 sm:px-6 [@media(max-height:500px)]:py-3',
                bodyClassName,
              )}
            >
              {hasDescription ? (
                <DialogPrimitive.Description
                  className={cn(
                    'text-sm leading-relaxed text-muted-foreground',
                    hasChildren && 'mb-4',
                  )}
                >
                  {description}
                </DialogPrimitive.Description>
              ) : null}
              {children}
            </div>
          ) : null}
          {footer ? (
            <div
              data-modal-footer
              className="flex shrink-0 flex-row justify-end gap-2 border-t border-border/60 bg-muted/20 px-4 py-4 sm:px-6 [@media(max-height:500px)]:py-2"
            >
              {footer}
            </div>
          ) : null}
          <DialogPrimitive.Close
            aria-label={t('close')}
            className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-lg text-muted-foreground/60 transition-all hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background max-lg:min-h-11 max-lg:min-w-11 lg:right-4 lg:top-4"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
