import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

const VARIANTS = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-primary-soft text-primary",
  accent: "bg-accent/25 text-accent-foreground",
  danger: "bg-destructive/10 text-destructive",
};

type BadgeVariant = keyof typeof VARIANTS;

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

export default function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
