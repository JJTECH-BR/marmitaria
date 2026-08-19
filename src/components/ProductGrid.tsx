import CardProduto from "./CardProduto";
import EmptyState from "./ui/EmptyState";
import { FiCoffee } from "react-icons/fi";
import type { Product } from "../contexts/AppContext";

interface ProductGridProps {
  products: Product[];
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
  emptyMessage?: string;
}

export default function ProductGrid({ products, onOpen, onAdd, emptyMessage }: ProductGridProps) {
  if (!products.length) {
    return (
      <EmptyState
        icon={<FiCoffee />}
        title="Nada por aqui ainda"
        description={emptyMessage || "Novos itens aparecem assim que forem cadastrados."}
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <CardProduto key={product.id} product={product} onOpen={onOpen} onAdd={onAdd} />
      ))}
    </div>
  );
}
