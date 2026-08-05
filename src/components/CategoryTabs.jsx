import { cn } from "../lib/utils";

export default function CategoryTabs({ categories, activeId, onChange }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
            activeId === category.id
              ? "border-primary bg-primary text-primary-foreground shadow-soft"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
