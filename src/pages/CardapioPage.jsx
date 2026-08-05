import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClientLayout from "../layouts/ClientLayout";
import CategoryTabs from "../components/CategoryTabs";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import Loading from "../components/ui/Loading";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { useMenu } from "../hooks/useMenu";

export default function CardapioPage() {
  const { loading } = useApp();
  const { addItem } = useCart();
  const { categories, available } = useMenu();
  const [activeId, setActiveId] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!activeId && categories.length) setActiveId(categories[0].id);
  }, [categories, activeId]);

  const handleAdd = (product, quantity = 1, note = "") => {
    addItem(product, quantity, note);
    toast.success(`${product.name} adicionado ao pedido`);
    setSelected(null);
  };

  if (loading) {
    return (
      <ClientLayout>
        <Loading />
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="container-app space-y-5 py-8">
        <div>
          <h1 className="text-2xl font-extrabold">Cardápio completo</h1>
          <p className="text-sm text-muted-foreground">Escolha por categoria.</p>
        </div>

        <CategoryTabs categories={categories} activeId={activeId} onChange={setActiveId} />

        <ProductGrid
          products={available.filter((product) => product.categoryId === activeId)}
          onOpen={setSelected}
          onAdd={handleAdd}
          emptyMessage="Nenhum item disponível nesta categoria."
        />
      </div>

      <ProductModal
        product={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={handleAdd}
      />
    </ClientLayout>
  );
}
