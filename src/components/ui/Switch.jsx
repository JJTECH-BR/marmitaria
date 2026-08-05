export default function Switch({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}
      <span className="relative inline-flex">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="h-6 w-11 rounded-full bg-input transition-colors duration-200 peer-checked:bg-primary" />
        <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card shadow-soft transition-transform duration-200 peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
