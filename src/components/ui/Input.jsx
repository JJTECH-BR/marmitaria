import { cn } from "../../lib/utils";

const base =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-soft transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

export default function Input({ label, className, id, ...props }) {
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}
      <input id={id} className={cn(base, className)} {...props} />
    </label>
  );
}

export function Select({ label, className, id, children, ...props }) {
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}
      <select id={id} className={cn(base, className)} {...props}>
        {children}
      </select>
    </label>
  );
}
