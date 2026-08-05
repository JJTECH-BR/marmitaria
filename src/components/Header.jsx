import { Link } from "@tanstack/react-router";
import { FiShoppingBag, FiSettings } from "react-icons/fi";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { company } = useApp();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          {company?.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-10 w-10 rounded-xl bg-surface object-contain p-1"
            />
          ) : null}
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold sm:text-base">
              {company?.name || "Marmitaria"}
            </span>
            <span className="text-xs text-muted-foreground">{company?.schedule}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/admin"
            aria-label="Painel administrativo"
            className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <FiSettings size={18} />
          </Link>
          <Link
            to="/carrinho"
            aria-label="Carrinho"
            className="relative rounded-full bg-primary p-2.5 text-primary-foreground transition-transform hover:scale-105"
          >
            <FiShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
