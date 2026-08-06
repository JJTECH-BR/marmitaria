import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FiBookOpen, FiTag, FiClipboard, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useApp } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";
import { formatPrice } from "../../utils/format";

const MENU_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: FiBookOpen },
  { to: "/dashboard/produtos", label: "Produtos", icon: FiBookOpen },
  { to: "/dashboard/categorias", label: "Categorias", icon: FiTag },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: FiTag },
  { to: "/dashboard/pedidos", label: "Pedidos", icon: FiClipboard },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { company, products, categories, orders } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Produtos", value: products.length, icon: FiBookOpen },
      { label: "Categorias", value: categories.length, icon: FiTag },
      { label: "Pedidos", value: orders.length, icon: FiClipboard },
    ],
    [products.length, categories.length, orders.length],
  );

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside
        className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-card p-5 transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            {company?.logo ? (
              <img src={company.logo} alt={company.name} className="h-11 w-11 rounded-2xl object-contain" />
            ) : null}
            <div>
              <p className="text-sm font-semibold text-primary">Painel</p>
              <p className="text-base font-extrabold">{company?.name || "Marmitaria"}</p>
            </div>
          </div>
          <button className="rounded-full p-2 text-muted-foreground lg:hidden" onClick={() => setMobileOpen(false)}>
            <FiX size={18} />
          </button>
        </div>

        <div className="mt-8 space-y-2">
          {MENU_ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
              activeProps={{ className: "bg-primary-soft text-primary" }}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          >
            <FiLogOut size={17} />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="border-b border-border bg-card/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button className="rounded-full p-2 text-muted-foreground lg:hidden" onClick={() => setMobileOpen(true)}>
                <FiMenu size={18} />
              </button>
              <div>
                <p className="text-sm font-semibold text-primary">Dashboard</p>
                <h1 className="text-xl font-extrabold">Painel Administrativo</h1>
              </div>
            </div>
            <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground">
              Ver cardápio
            </Link>
          </div>
        </header>

        <main className="space-y-6 p-4 sm:p-6">
          <section className="grid gap-4 md:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">{label}</span>
                  <span className="rounded-2xl bg-primary-soft p-2 text-primary">
                    <Icon size={18} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">{value}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold">Últimos pedidos</h2>
                <p className="text-sm text-muted-foreground">Acompanhe os pedidos recebidos pelo WhatsApp.</p>
              </div>
            </div>
            {orders.length ? (
              <ul className="mt-4 space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <li key={order.id} className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-4 py-3">
                    <div>
                      <p className="font-semibold">{order.cliente}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.data).toLocaleString("pt-BR")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{formatPrice(order.valorTotal)}</p>
                      <p className="text-xs text-muted-foreground">{order.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nenhum pedido registrado ainda.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
