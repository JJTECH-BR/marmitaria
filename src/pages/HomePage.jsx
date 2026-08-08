import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import ClientLayout from "../layouts/ClientLayout";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { cn } from "../lib/utils";
import Loading from "../components/ui/Loading";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";

const SECTIONS = [
  {
    id: "marmitas-tradicionais",
    label: "Marmitas Tradicionais",
    title: "Marmitas Tradicionais",
    subtitle: "Monte sua marmita do seu jeito, escolhendo o tamanho, acompanhamentos e duas proteínas.",
    categoryName: "Marmitas Tradicionais",
  },
  {
    id: "promocional-do-dia",
    label: "Promocional do Dia",
    title: "Promocional do Dia",
    subtitle: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
    categoryName: "Promocional do Dia",
  },
  {
    id: "individuais",
    label: "Individuais",
    title: "Pratos Individuais",
    subtitle: "Clássicos sempre no cardápio.",
    categoryName: "Pratos Individuais",
  },
];

export default function HomePage() {
  const { company, products, categories, loading } = useApp();
  const { addItem, count, subtotal } = useCart();
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const [selected, setSelected] = useState(null);

  const byCategoryName = (name) => {
    const category = categories.find((c) => c.name === name);
    return category ? products.filter((p) => p.categoryId === category.id && p.available) : [];
  };

  const openProduct = (product) => setSelected(product);

  const quickAdd = (product) => {
    const isCustomizable = product.sizes || product.proteins || product.meats;
    if (isCustomizable) {
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
      <Hero company={company} onShowAll={() => setActiveTab("ver-pratos")} />

      <nav className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-app flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-all",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:border-primary/50 hover:text-primary",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="container-app space-y-12 py-8">
        {SECTIONS.map((section) => {
          const isVisible = activeTab === "ver-pratos" || activeTab === section.id;
          if (!isVisible) return null;

          return (
            <MenuSection
              key={section.id}
              id={section.id}
              title={section.title}
              subtitle={section.subtitle}
              products={byCategoryName(section.categoryName)}
              onOpen={openProduct}
              onAdd={quickAdd}
            />
          );
        })}
      </main>

      <ProductModal
        product={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={handleConfirm}
      />

      {count > 0 ? <CartBar count={count} total={subtotal} /> : null}

      <Footer company={company} />
    </ClientLayout>
  );
}

function Hero({ company, onShowAll }) {
  return (
    <section className="container-app pt-5">
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <img
          src={company?.banner || "/images/banner.jpg"}
          alt="Marmitas deliciosas"
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-4 p-8 sm:p-12">
          <Badge variant="accent">AMOR EM CADA DETALHE</Badge>
          <h1 className="max-w-lg text-4xl font-extrabold text-white sm:text-5xl">
            Cardápio do Dia
          </h1>
          <p className="max-w-lg text-base text-white/90">
            COMIDA DE QUALIDADE SABOR QUE IMPRESSIONA.
          </p>
          <Button
            size="lg"
            variant="accent"
            className="mt-4"
            onClick={onShowAll}
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
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      <ProductGrid products={products} onOpen={onOpen} onAdd={onAdd} />
    </section>
  );
}

function CartBar({ count, total }) {
  return (
    <div className="sticky bottom-4 z-40 px-4">
      <Link
        to="/carrinho"
        className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-full bg-primary px-6 py-4 text-primary-foreground shadow-float transition-transform hover:bg-primary/90 active:scale-[0.98]"
      >
        <span className="flex items-center gap-4">
          <span className="relative">
            <FiShoppingBag size={24} />
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-accent-foreground">
              {count}
            </span>
          </span>
          <span className="text-base font-bold">Ver carrinho</span>
        </span>
        <span className="text-lg font-extrabold">{formatPrice(total)}</span>
      </Link>
    </div>
  );
}

function Footer({ company }) {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container-app mx-auto grid gap-12 px-4 py-16 lg:grid-cols-3">
        <div className="space-y-4">
          {company?.logo ? (
            <img src={company.logo} alt={company.name} className="h-10 w-auto" />
          ) : (
            <h3 className="text-lg font-bold">{company?.name || "Marmitaria"}</h3>
          )}
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>{company?.address}</p>
            <p>{company?.schedule}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">Navegação</h3>
          <ul className="space-y-2 text-sm">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">Fale conosco</h3>
          <p className="text-sm text-muted-foreground">Telefone: {company?.phone}</p>
          <a
            href={`https://wa.me/${company?.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-primary transition-colors hover:underline"
          >
            Enviar mensagem no WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border bg-background/50">
        <div className="container-app mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 text-center text-xs text-muted-foreground sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} {company?.name}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido com ❤️ por{" "}
            <a
              href="https://jj-tech26.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors hover:underline"
            >
              JJ Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
