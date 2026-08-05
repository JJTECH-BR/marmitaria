import { cn } from "../../lib/utils";

const VARIANTS = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:brightness-110 active:scale-[0.98]",
  accent: "bg-accent text-accent-foreground shadow-soft hover:brightness-105 active:scale-[0.98]",
  outline: "border border-border bg-card text-foreground hover:bg-secondary",
  ghost: "text-foreground hover:bg-secondary",
  soft: "bg-primary-soft text-primary hover:brightness-95",
  danger: "bg-destructive text-destructive-foreground hover:brightness-110",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
  icon: "h-10 w-10",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  fullWidth = false,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
