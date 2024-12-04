'use client'

import * as React from 'react'
import { MotionDiv } from 'src/components/common/motion'
import { cn } from 'src/utilities/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <MotionDiv
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg px-3 py-2 text-sm transition-all duration-200",
            "bg-[hsl(var(--theme-input-bg))]",
            "text-[hsl(var(--theme-text))]",
            "border border-[hsl(var(--theme-border-color))]",
            "placeholder:text-[hsl(var(--muted-foreground))]",
            "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-6 left-0 text-xs text-[hsl(var(--destructive))]"
          >
            {error}
          </MotionDiv>
        )}
      </MotionDiv>
    )
  }
)
Input.displayName = 'Input'

export { Input }
