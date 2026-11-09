import * as React from 'react'

import { cn } from '@/lib/utils'

type InputFieldShellProps = {
  label?: React.ReactNode
  htmlFor?: string
  isInvalid?: boolean
  errorMessage?: string | null
  className?: string
  children: React.ReactNode
}

export function InputFieldShell({
  label,
  htmlFor,
  isInvalid,
  errorMessage,
  className,
  children,
}: InputFieldShellProps) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined
  const errorNode =
    isInvalid && errorMessage ? (
      <p id={errorId} role="alert" className="text-xs leading-tight text-destructive">
        {errorMessage}
      </p>
    ) : null

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <label htmlFor={htmlFor} className="text-sm font-medium leading-none text-foreground/90">
          {label}
        </label>
      ) : null}
      {children}
      {errorNode}
    </div>
  )
}
