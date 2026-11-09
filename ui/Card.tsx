import * as React from 'react'

import { cn } from '@/lib/utils'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

const cardPadClass: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: CardPadding
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card text-card-foreground',
        padding && cardPadClass[padding],
        className,
      )}
      style={{ boxShadow: 'var(--card-shadow)', ...style }}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

export { Card }
