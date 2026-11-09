import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

import { cn } from '@/lib/utils'

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  children?: React.ReactNode
  /** Classes for the wrapping label (e.g. to push the track to the far edge). */
  labelClassName?: string
}

/**
 * The track stays 24px tall on touch screens: the pill's height IS the control. The wrapping
 * `<label>` is the real activation area, since it carries the text and forwards the click.
 */
const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, children, labelClassName, ...props }, ref) => (
    <label className={cn('flex cursor-pointer items-center gap-2', labelClassName)}>
      <SwitchPrimitives.Root
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-[transform,background-color] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitives.Root>
      {children && <span className="text-sm">{children}</span>}
    </label>
  ),
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
