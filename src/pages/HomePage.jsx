import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FiArrowRight, FiShoppingBag, FiChevronRight } from "react-icons/fi";
import ClientLayout from "../layouts/ClientLayout";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Loading from "../components/ui/Loading";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";

const SECTIONS = [
  { id: "pratos-do-dia", label: "Pratos do Dia" },
  { id: "individuais", label: "Individuais" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
];

export default function HomePage() {
  const { company, products, categories, loading } = useApp();
  const { addItem, count, subtotal } = useCart();
  const [selected, setSelected] = useState(null);

  const sides = products.filter(
    (p) =>
      categories.find((c) => c.id === p.categoryId)?.name === "Acompanhamentos" &&
      p.available &&
      !/batata/i.test(p.name),
  );

  const byCategoryName = (name) => {
    const category = categories.find((c) => c.name === name);
    return category ? products.filter((p) => p.categoryId === category.id && p.available) : [];
  };

  const openProduct = (product) => setSelected(product);

  const quickAdd = (product) => {
    if (product.type === "prato-do-dia" || (product.sizes || []).some((s) => Number(s.price) > 0)) {
      openProduct(product);
      return;
    }
    addItem(product, 1, "");
    toast.success(`${product.name} adicionado ao pedido`);
  };

  const handleConfirm = (product, quantity = 1, note = "", customization = {}) => {
    addItem(product, quantity, note, customization);
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
      <Hero company={company} />

      <nav className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-app flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="container-app space-y-12 py-8">
        <MenuSection
          id="pratos-do-dia"
          title="Pratos do Dia"
          subtitle="Escolha o tamanho, 2 proteínas e os acompanhamentos. Válidos hoje."
          products={byCategoryName("Prato do Dia")}
          onOpen={openProduct}
          onAdd={quickAdd}
        />

        <MenuSection
          id="individuais"
          title="Pratos Individuais"
          subtitle="Clássicos sempre no cardápio."
          products={byCategoryName("Pratos Individuais")}
          onOpen={openProduct}
          onAdd={quickAdd}
        />

        <MenuSection
          id="acompanhamentos"
          title="Acompanhamentos"
          subtitle="Porções extras para completar sua marmita."
          products={byCategoryName("Acompanhamentos")}
          onOpen={openProduct}
          onAdd={quickAdd}
        />
      </main>

      <ProductModal
        product={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirm}
        sides={sides}
      />

      {count > 0 ? <CartBar count={count} total={subtotal} /> : null}
    </ClientLayout>
  );
}

function Hero({ company }) {
  return (
    <section className="container-app pt-5">
      <div className="relative overflow-hidden rounded-3xl shadow-card">
        {company?.banner ? (
          <img
            src={company.banner}
            alt={`Cardápio da ${company?.name}`}
            className="h-56 w-full object-cover sm:h-72"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 sm:p-10">
          <Badge variant="accent">Feito na hora</Badge>
          <h1 className="max-w-md text-3xl font-extrabold text-white sm:text-4xl">
            Cardápio do Dia
          </h1>
          <p className="max-w-md text-sm text-white/85">
            Comida caseira, porções generosas e entrega rápida. Monte sua marmita do seu jeito.
          </p>
          <Button
            size="lg"
            variant="accent"
            className="mt-1"
            onClick={() =>
              document.getElementById("pratos-do-dia")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver Pratos <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ id, title, subtitle, products, onOpen, onAdd }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
          {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <FiChevronRight className="mb-1 shrink-0 text-muted-foreground" />
      </div>
      <ProductGrid products={products} onOpen={onOpen} onAdd={onAdd} />
    </section>
  );
}

function CartBar({ count, total }) {
  return (
    <div className="sticky bottom-4 z-40 px-4 pb-4">
      <Link
        to="/carrinho"
        className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-full bg-primary px-5 py-4 text-primary-foreground shadow-float transition-transform active:scale-[0.98]"
      >
        <span className="flex items-center gap-3">
          <span className="relative">
            <FiShoppingBag size={22} />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
              {count}
            </span>
          </span>
          <span className="text-sm font-bold">Ver carrinho</span>
        </span>
        <span className="text-base font-extrabold">{formatPrice(total)}</span>
      </Link>
    </div>
  );
}
