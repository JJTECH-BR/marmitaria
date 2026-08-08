export default function AdminLayout({ title, subtitle, action, children }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-card sm:px-6">
        <div>
          <h1 className="text-lg font-extrabold sm:text-xl">{title}</h1>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
