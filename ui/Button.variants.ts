import { cva } from 'class-variance-authority'

/**
 * Phone/tablet touch-target floor (WCAG 2.5.5, 44px).
 *
 * A MINIMUM, never a height: `cn` is `twMerge`, so a call site's own `size-7` deletes a competing
 * `h-*`/`w-*` coming from a shared base. `min-h`/`min-w` is a different twMerge group and a
 * different CSS property, so the floor cannot be flattened from the call site.
 *
 * `max-lg:` because 1024px is where input stops being finger-driven; desktop geometry stays as is.
 */
export const touchTargetFloor = 'max-lg:min-h-11 max-lg:min-w-11'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ' +
    touchTargetFloor,
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground ring-1 ring-inset ring-white/10 shadow-[0_1px_3px_hsl(var(--primary)/0.4),0_1px_1px_hsl(var(--primary)/0.3)] hover:bg-primary/90 hover:shadow-[0_2px_6px_hsl(var(--primary)/0.45)]',
        destructive:
          'bg-destructive text-destructive-foreground ring-1 ring-inset ring-white/10 shadow-[0_1px_3px_hsl(var(--destructive)/0.35),0_1px_1px_hsl(var(--destructive)/0.25)] hover:bg-destructive/90 hover:shadow-[0_2px_6px_hsl(var(--destructive)/0.4)]',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-border-strong',
        secondary:
          'bg-secondary-strong text-secondary-foreground ring-1 ring-inset ring-white/10 shadow-[0_1px_3px_hsl(var(--secondary-strong)/0.3),0_1px_1px_hsl(var(--secondary-strong)/0.2)] hover:bg-secondary-strong-hover hover:shadow-[0_2px_6px_hsl(var(--secondary-strong)/0.35)]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
