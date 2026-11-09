import { cn } from '@/lib/utils'

/**
 * The font size of everything the user types into. iOS Safari zooms the page in when a focused
 * text control renders below 16px and never zooms back out, so the phone tier is a literal 16px
 * and the design size returns at `md:`. Keep it the LAST font size in any class string that
 * reaches a control: `cn` is `twMerge`, and a later unprefixed `text-*` would delete the 16px half.
 */
export const inputTextSize = 'text-[16px]/[20px] md:text-sm'

const base =
  'flex w-full rounded-md border bg-background transition-colors max-lg:min-h-11 ' +
  inputTextSize +
  ' placeholder:text-muted-foreground/60 hover:border-border/80 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-ring'

const invalid =
  'border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive'

const sizes = {
  input: 'h-9 px-3 py-2',
  textarea: 'min-h-[80px] px-3 py-2 resize-y',
  trigger: 'h-9 px-3 py-2 items-center justify-between',
} as const

export function inputClasses(
  variant: keyof typeof sizes,
  isInvalid?: boolean,
  className?: string,
): string {
  return cn(base, sizes[variant], isInvalid ? invalid : 'border-input', className)
}
