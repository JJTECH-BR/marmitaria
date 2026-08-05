import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FiArrowRight, FiStar } from "react-icons/fi";
import ClientLayout from "../layouts/ClientLayout";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import SidesList from "../components/SidesList";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loading from "../components/ui/Loading";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { useMenu } from "../hooks/useMenu";

export default function HomePage() {
  const { company, loading } = useApp();
  const { addItem, items, removeItem } = useCart();
  const { dailyDishes, fixedDishes, sides } = useMenu();
  const [selected, setSelected] = useState(null);

  const selectedSideIds = items.map((item) => item.productId);

  const feedback = (product) => toast.success(`${product.name} adicionado ao pedido`);

  const handleAdd = (product, quantity = 1, note = "") => {
    addItem(product, quantity, note);
    feedback(product);
    setSelected(null);
  };

  const toggleSide = (side) => {
    const existing = items.find((item) => item.productId === side.id);
    if (existing) {
      removeItem(existing.id);
      return;
    }
    addItem(side, 1);
    feedback(side);
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
      <section className="container-app pt-6">
        <div className="relative overflow-hidden rounded-3xl shadow-card">
          {company?.banner ? (
            <img
              src={company.banner}
              alt={`Cardápio da ${company?.name}`}
              width={1600}
              height={900}
              className="h-64 w-full object-cover sm:h-80"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-10">
            <Badge variant="accent">
              <FiStar className="mr-1" /> Feito na hora
            </Badge>
            <h1 className="max-w-md text-3xl font-extrabold text-primary-foreground sm:text-4xl">
              Cardápio do Dia
            </h1>
            <p className="max-w-md text-sm text-primary-foreground/85">
              Comida caseira, porções generosas e entrega rápida no seu bairro.
            </p>
            <Button
              size="lg"
              variant="accent"
              className="mt-1"
              onClick={() => {
                document.getElementById("pratos-do-dia")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Ver Cardápio <FiArrowRight />
            </Button>


          </div>
        </div>
      </section>

      <section id="pratos-do-dia" className="container-app scroll-mt-20 pt-10">
        <SectionTitle title="Pratos do Dia" description="Disponíveis somente hoje." />
        <ProductGrid products={dailyDishes} onOpen={setSelected} onAdd={handleAdd} />
      </section>

      <section className="container-app pt-10">
        <SectionTitle title="Pratos Fixos" description="Sempre no cardápio." />
        <ProductGrid products={fixedDishes} onOpen={setSelected} onAdd={handleAdd} />
      </section>

      <section className="container-app pt-10">
        <SectionTitle title="Acompanhamentos" description="Complete sua marmita." />
        <SidesList sides={sides} selectedIds={selectedSideIds} onToggle={toggleSide} />
      </section>

      <section className="container-app pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-primary p-6 text-primary-foreground shadow-card">
          <div>
            <h2 className="text-lg font-extrabold">Pedido pronto?</h2>
            <p className="text-sm opacity-85">Finalize em segundos pelo WhatsApp.</p>
          </div>
          <Link to="/carrinho">
            <Button variant="accent">Ver carrinho</Button>
          </Link>
        </div>
      </section>

      <ProductModal
        product={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={handleAdd}
      />
    </ClientLayout>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
