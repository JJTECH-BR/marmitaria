import Sidebar from "../components/Sidebar";

export default function AdminLayout({ title, subtitle, action, children }) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="border-b border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-8">
            <div>
              <h1 className="text-xl font-extrabold">{title}</h1>
              {subtitle ? (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              ) : null}
            </div>
            {action}
          </div>
        </div>
        <div className="px-4 py-6 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
