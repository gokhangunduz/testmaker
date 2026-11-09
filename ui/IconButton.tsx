import * as React from 'react'

import { Button, type ButtonProps } from './Button'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

type IconButtonProps = Omit<ButtonProps, 'size' | 'aria-label'> & {
  /** Accessible name; also shown as the tooltip. */
  label: string
}

/** Square icon-only button with a tooltip. */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, variant = 'ghost', children, ...props }, ref) => (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>
        <Button ref={ref} variant={variant} size="icon" aria-label={label} {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  ),
)
IconButton.displayName = 'IconButton'
