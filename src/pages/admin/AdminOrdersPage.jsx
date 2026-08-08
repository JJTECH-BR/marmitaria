import AdminLayout from "../../layouts/AdminLayout";
import { useApp } from "../../contexts/AppContext";
import { formatPrice } from "../../utils/format";

export default function AdminOrdersPage() {
  const { orders } = useApp();

  return (
    <AdminLayout title="Pedidos" subtitle="Histórico de pedidos recebidos">
      {orders.length ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-border bg-card p-4 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{order.cliente}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.data).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{formatPrice(order.valorTotal)}</p>
                  <p className="text-xs text-muted-foreground">{order.status}</p>
                </div>
              </div>
              {order.itens?.length ? (
                <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm text-muted-foreground">
                  {order.itens.map((item) => (
                    <li key={item.id}>
                      {item.quantity}x {item.name}
                      {item.size?.label ? ` (${item.size.label})` : ""}
                      {item.meat ? ` — ${item.meat.name} (+R$ 4)` : ""}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
          Nenhum pedido registrado até o momento.
        </div>
      )}
    </AdminLayout>
  );
}
