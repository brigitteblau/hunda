import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-[#171717] text-white hover:bg-[#41C086]",
  secondary: "bg-white text-[#171717] border border-black/10 hover:border-[#171717]",
  ghost: "bg-transparent text-[#171717] hover:bg-black/5",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant = "primary", className = "", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClass[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
