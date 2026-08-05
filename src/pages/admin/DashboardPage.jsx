import { FiBookOpen, FiTag, FiClipboard } from "react-icons/fi";
import AdminLayout from "../../layouts/AdminLayout";
import Badge from "../../components/ui/Badge";
import { useApp } from "../../contexts/AppContext";
import { formatDate, formatPrice } from "../../utils/format";

export default function DashboardPage() {
  const { products, categories, orders } = useApp();

  const stats = [
    { label: "Produtos", value: products.length, icon: FiBookOpen },
    { label: "Categorias", value: categories.length, icon: FiTag },
    { label: "Pedidos", value: orders.length, icon: FiClipboard },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Visão geral da operação">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">{label}</span>
              <span className="rounded-xl bg-primary-soft p-2 text-primary">
                <Icon size={18} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold">{value}</p>
          </div>
        ))}
      </div>

      {orders.length ? (
        <div className="mt-8 space-y-3">
          <h2 className="text-base font-extrabold">Últimos pedidos</h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
            {orders.slice(0, 5).map((order) => (
              <li key={order.id} className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-bold">{order.cliente}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(order.data)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{order.status}</Badge>
                  <span className="text-sm font-extrabold text-primary">
                    {formatPrice(order.valorTotal)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </AdminLayout>
  );
}
