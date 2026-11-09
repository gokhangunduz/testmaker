'use client'

import { ReactElement, useId } from 'react'

interface IInputColor {
  label: string
  color: string
  onChange: (color: string) => void
}

/** Label, hex value and a swatch that opens the platform's own colour picker. */
export default function InputColor({ label, color, onChange }: IInputColor): ReactElement {
  const id = useId()

  return (
    <div className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-1 py-1.5 hover:bg-muted">
      <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer break-words text-sm">
        {label}
      </label>
      <span className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-xs uppercase text-muted-foreground">{color}</span>
        <input
          id={id}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="size-8 shrink-0 cursor-pointer appearance-none rounded-md border border-border bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-lg:size-11 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
        />
      </span>
    </div>
  )
}
