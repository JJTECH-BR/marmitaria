import { cn } from "../../lib/utils";

export default function Textarea({ label, className, id, ...props }) {
  return (
    <label className="block space-y-1.5" htmlFor={id}>
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}
      <textarea
        id={id}
        rows={3}
        className={cn(
          "w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground shadow-soft transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30",
          className,
        )}
        {...props}
      />
    </label>
  );
}
