import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiSend } from "react-icons/fi";
import ClientLayout from "../layouts/ClientLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import EmptyState from "../components/ui/EmptyState";
import { useApp } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";
import { buildOrderMessage, buildWhatsappUrl } from "../utils/whatsapp";

export default function CarrinhoPage() {
  const { company, settings, categories, createOrder } = useApp();
  const { items, note, setNote, updateQuantity, removeItem, subtotal, total, clearCart } =
    useCart();
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const handleFinish = () => {
    if (!items.length) return;

    const message = buildOrderMessage({ items, note, total, settings, categories });

    createOrder({
      cliente: customer.name || "Cliente",
      telefone: customer.phone,
      itens: items,
      observacao: note,
      valorTotal: total,
    });

    window.open(buildWhatsappUrl(company?.whatsapp, message), "_blank");
    clearCart();
    toast.success("Pedido enviado pelo WhatsApp!");
  };

  return (
    <ClientLayout>
      <div className="container-app grid gap-6 py-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">Seu pedido</h1>

          {items.length ? (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl bg-card p-3 shadow-card transition-shadow hover:shadow-float"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-bold">{item.name}</h2>
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.unitPrice)} un.
                        </p>
                        <ItemDetails item={item} />
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.name}`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Diminuir"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <FiMinus />
                        </Button>
                        <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                        <Button
                          variant="soft"
                          size="icon"
                          aria-label="Aumentar"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <FiPlus />
                        </Button>
                      </div>
                      <span className="text-sm font-extrabold text-primary">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<FiShoppingBag />}
              title="Seu carrinho está vazio"
              description="Adicione marmitas e acompanhamentos para continuar."
              action={
                <Link to="/">
                  <Button>Ver cardápio</Button>
                </Link>
              }
            />
          )}
        </div>

        <aside className="h-fit space-y-4 rounded-3xl bg-card p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="text-base font-extrabold">Resumo</h2>

          <Input
            id="cliente"
            label="Seu nome"
            placeholder="Como podemos te chamar?"
            value={customer.name}
            onChange={(event) => setCustomer((c) => ({ ...c, name: event.target.value }))}
          />
          <Input
            id="telefone"
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={customer.phone}
            onChange={(event) => setCustomer((c) => ({ ...c, phone: event.target.value }))}
          />
          <Textarea
            id="observacao"
            label="Observações do pedido"
            placeholder="Ex: sem cebola, entregar às 12h..."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />

          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-base font-extrabold">
              <dt>Total</dt>
              <dd className="text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Button fullWidth size="lg" disabled={!items.length} onClick={handleFinish}>
            <FiSend /> Finalizar Pedido
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            O pedido é enviado pelo WhatsApp da marmitaria.
          </p>
        </aside>
      </div>
    </ClientLayout>
  );
}

function ItemDetails({ item }) {
  const rows = [];
  if (item.size?.label) rows.push(`Tamanho: ${item.size.label}`);
  if (item.proteins?.length) rows.push(`Proteínas: ${item.proteins.join(", ")}`);
  if (item.fries) {
    rows.push(`Batata: ${item.fries === "batata-frita" ? "Batatinha Frita" : "Batata Palha"}`);
  }
  if (item.sides?.length) rows.push(`Acompanhamentos: ${item.sides.join(", ")}`);
  if (item.meat) rows.push(`Carne premium: ${item.meat.name} (+${formatPrice(item.meat.extra)})`);
  if (item.note) rows.push(`Obs: ${item.note}`);

  if (!rows.length) return null;

  return (
    <ul className="mt-1 space-y-0.5 text-xs text-accent-foreground">
      {rows.map((row) => (
        <li key={row}>• {row}</li>
      ))}
    </ul>
  );
}
