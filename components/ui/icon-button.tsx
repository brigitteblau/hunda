import { forwardRef } from "react";

const IconButton = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className = "", ...props }, ref) => (
    <a
      ref={ref}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-[#41C086] ${className}`}
      {...props}
    />
  )
);
IconButton.displayName = "IconButton";

export { IconButton };
