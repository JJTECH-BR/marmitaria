import { formatPrice } from "../utils/format";
import EmptyState from "./ui/EmptyState";
import { FiList } from "react-icons/fi";

/** Lista de acompanhamentos com checkbox — clique alterna o item no pedido. */
export default function SidesList({ sides, selectedIds, onToggle }) {
  if (!sides.length) {
    return (
      <EmptyState
        icon={<FiList />}
        title="Sem acompanhamentos"
        description="Cadastre itens na categoria Acompanhamentos."
      />
    );
  }

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
      {sides.map((side) => {
        const checked = selectedIds.includes(side.id);
        return (
          <li key={side.id}>
            <label className="flex cursor-pointer items-center gap-3 p-4 transition-colors hover:bg-surface">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(side)}
                className="h-5 w-5 shrink-0 accent-primary"
              />
              <span className="flex-1">
                <span className="block text-sm font-semibold">{side.name}</span>
                <span className="block text-xs text-muted-foreground">{side.description}</span>
              </span>
              <span className="text-sm font-bold text-primary">{formatPrice(side.price)}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
