interface LoadingProps {
  label?: string;
}

export default function Loading({ label = "Carregando..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary-soft border-t-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
