import * as React from 'react'

import { InputFieldShell } from './InputFieldShell'
import { inputClasses } from './inputStyles'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode
  isInvalid?: boolean
  errorMessage?: string | null
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, label, isInvalid, errorMessage, id, ...props }, ref) => {
    const autoId = React.useId()
    const inputId = id ?? autoId

    return (
      <InputFieldShell
        label={label}
        htmlFor={inputId}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      >
        <input
          id={inputId}
          ref={ref}
          aria-invalid={isInvalid || undefined}
          aria-describedby={isInvalid && errorMessage ? `${inputId}-error` : undefined}
          className={inputClasses('input', isInvalid, className)}
          {...props}
        />
      </InputFieldShell>
    )
  },
)

TextInput.displayName = 'TextInput'
