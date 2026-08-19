import { FiAlertTriangle } from "react-icons/fi";
import { useDemo } from "../contexts/DemoContext";

export default function DemoBanner() {
  const { remainingOrders, maxCartItems } = useDemo();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-xs font-semibold text-amber-950 dark:bg-amber-600 dark:text-amber-50">
      <FiAlertTriangle size={14} />
      <span>
        Modo Demo — Limite de {maxCartItems} itens no carrinho e{" "}
        {remainingOrders} pedido{remainingOrders !== 1 ? "s" : ""} restante
        {remainingOrders !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
