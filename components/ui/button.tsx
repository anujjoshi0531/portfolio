import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/index";

const buttonVariants = cva(
  "inline-flex cursor-pointer hover:scale-[0.98] duration-300 border-2 border-theme items-center justify-center gap-2 whitespace-nowrap rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-theme text-background shadow-sm",
        destructive:
          "border border-destructive/20 text-destructive hover:bg-destructive/10 bg-destructive/5",
        outline:
          "border-theme bg-background text-theme shadow-xs hover:bg-theme hover:text-background",
        secondary:
          "bg-secondary border-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "border-none hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 md:p-6 p-5 text-sm sm:text-md md:text-lg",
        sm: "rounded-md h-9 px-3 text-xs",
        md: "h-9 p-5 text-sm",
        lg: "h-10 p-7 text-xl",
        lgIcon: "h-12 w-12 [&_svg]:size-6",
        icon: "h-10 w-10 [&_svg]:size-5",
        mdIcon: "size-8 [&_svg]:size-4",
        smIcon: "size-5 [&_svg]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
