import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { FiBookOpen, FiTag, FiClipboard } from "react-icons/fi";
import AdminLayout from "../../layouts/AdminLayout";
import { useApp } from "../../contexts/AppContext";
import { formatPrice } from "../../utils/format";

export default function DashboardPage() {
  const { company, products, categories, orders } = useApp();

  const stats = useMemo(
    () => [
      { label: "Produtos", value: products.length, icon: FiBookOpen },
      { label: "Categorias", value: categories.length, icon: FiTag },
      { label: "Pedidos", value: orders.length, icon: FiClipboard },
    ],
    [products.length, categories.length, orders.length],
  );

  return (
    <AdminLayout
      title={`Olá, ${company?.name || "Marmitaria"} 👋`}
      subtitle="Acompanhe o resumo do seu cardápio e dos pedidos."
      action={
        <Link
          to="/"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          Ver cardápio
        </Link>
      }
    >
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
        <div>
          <h2 className="text-lg font-extrabold">Últimos pedidos</h2>
          <p className="text-sm text-muted-foreground">Pedidos recebidos pelo WhatsApp.</p>
        </div>
        {orders.length ? (
          <ul className="mt-4 space-y-3">
            {orders.slice(0, 5).map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-4 py-3"
              >
                <div>
                  <p className="font-semibold">{order.cliente}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.data).toLocaleString("pt-BR")}
                  </p>
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
    </AdminLayout>
  );
}
