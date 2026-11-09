import * as React from 'react'

import { InputFieldShell } from './InputFieldShell'
import { inputClasses } from './inputStyles'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: React.ReactNode
  isInvalid?: boolean
  errorMessage?: string | null
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, isInvalid, errorMessage, rows = 3, id, ...props }, ref) => {
    const autoId = React.useId()
    const textareaId = id ?? autoId

    return (
      <InputFieldShell
        label={label}
        htmlFor={textareaId}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      >
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={isInvalid || undefined}
          aria-describedby={isInvalid && errorMessage ? `${textareaId}-error` : undefined}
          className={inputClasses('textarea', isInvalid, className)}
          {...props}
        />
      </InputFieldShell>
    )
  },
)

Textarea.displayName = 'Textarea'
