import { cn } from '@/lib/utils'

/**
 * Building blocks for "segmented" button groups: a pill-shaped row of joined buttons that behaves
 * as a single control (the answer picker). For standalone actions use <Button>.
 */

export const segmentGroup =
  'inline-flex w-full items-stretch overflow-hidden rounded-lg border border-border bg-card shadow-sm'

const segmentBase =
  'inline-flex flex-1 items-center justify-center text-xs font-medium ' +
  'max-lg:min-h-11 max-lg:min-w-11 min-h-8 ' +
  'transition-[color,background-color,transform] active:scale-[0.97] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ' +
  'disabled:pointer-events-none disabled:opacity-50'

type SegmentOptions = {
  active?: boolean
  withDivider?: boolean
  className?: string
}

/** Text chip inside a segmentGroup. */
export function segmentChip({ active, withDivider, className }: SegmentOptions = {}): string {
  return cn(
    segmentBase,
    'px-3 py-1.5',
    withDivider && 'border-l border-border/60',
    active
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
    className,
  )
}
