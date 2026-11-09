import { ReactNode, ReactElement } from 'react'
import { cn } from '@/lib/utils'

interface ISidebarSection {
  label: string
  children: ReactNode
  gap?: number
  className?: string
}

export default function SidebarSection({
  label,
  children,
  gap = 3,
  className,
}: ISidebarSection): ReactElement {
  return (
    <section className={cn('flex w-full flex-col gap-3', className)}>
      <h2 className="border-b border-border pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </h2>
      <div className="flex w-full flex-col" style={{ gap: `${gap * 0.25}rem` }}>
        {children}
      </div>
    </section>
  )
}
