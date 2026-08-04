import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-bold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D95A00] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#D95A00] text-white hover:bg-[#B8561B] active:bg-[#9E521D]", // Molten Orange
        secondary: "bg-[#C8D0DC] text-[#1A1D20] border border-[#A6ACB6] hover:bg-[#B8BEC8] active:bg-[#A6ACB6]", // Steel Slate
        outline: "border border-[#A6ACB6] bg-[#E4E8EE] text-[#1A1D20] hover:bg-[#C8D0DC]",
        ghost: "text-[#1A1D20] hover:bg-[#C8D0DC] hover:text-[#1A1D20]",
        destructive: "bg-[#9B3227] text-white hover:bg-[#80271E]",
        link: "text-[#D95A00] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-6 text-sm",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
