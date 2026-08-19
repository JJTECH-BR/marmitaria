import { formatPrice, onlyDigits } from "./format";

const SIDE_CATEGORY = "acompanhamentos";

interface OrderItem {
  quantity: number;
  name: string;
  size?: { label?: string; value?: string | number; price?: number } | null;
  proteins?: string[];
  fries?: string | null;
  sides?: string[];
  meat?: { name: string; extra: number } | null;
  note?: string;
  unitPrice: number;
  categoryId: string;
  [key: string]: unknown;
}

interface OrderCategory {
  id: string;
  name: string;
}

export function buildOrderMessage({
  items,
  note,
  total,
  settings,
  categories,
}: {
  items: OrderItem[];
  note: string;
  total: number;
  settings: { defaultMessage?: string } | null;
  categories: OrderCategory[];
}): string {
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name || "";
  const isSide = (item: OrderItem) => categoryName(item.categoryId).toLowerCase() === SIDE_CATEGORY;

  const dishes = items.filter((item) => !isSide(item));
  const sides = items.filter(isSide);

  const lines = [settings?.defaultMessage || "Olá! Gostaria de fazer um pedido."];

  if (dishes.length) {
    lines.push("", "*Pedido*");
    dishes.forEach((item) => {
      lines.push(`${item.quantity}x ${item.name}`);
      const details = describeItem(item);
      details.forEach((line) => lines.push(`• ${line}`));
    });
  }

  if (sides.length) {
    lines.push("", "*Acompanhamentos extras*");
    sides.forEach((item) =>
      lines.push(`${item.quantity}x ${item.name} — ${formatPrice(item.unitPrice)}`),
    );
  }

  const notes = items.filter((item) => item.note).map((item) => `${item.name}: ${item.note}`);
  if (note) notes.push(note);

  if (notes.length) {
    lines.push("", "*Observações*", ...notes);
  }

  lines.push("", "*Total*", formatPrice(total));

  return lines.join("\n");
}

function describeItem(item: OrderItem): string[] {
  const details: string[] = [];
  if (item.size?.label) details.push(String(item.size.label));
  if (item.proteins?.length) details.push(`Proteínas: ${item.proteins.join(", ")}`);
  if (item.fries) {
    const friesName = item.fries === "batata-frita" ? "Batatinha Frita" : "Batata Palha";
    details.push(`Batata: ${friesName}`);
  }
  if (item.sides?.length) details.push(`Acompanhamentos: ${item.sides.join(", ")}`);
  if (item.meat)
    details.push(`Carne premium: ${item.meat.name} (+${formatPrice(item.meat.extra)})`);
  return details;
}

export function buildWhatsappUrl(phone: string | undefined, message: string): string {
  return `https://wa.me/${onlyDigits(phone)}?text=${encodeURIComponent(message)}`;
}
