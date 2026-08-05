import { formatPrice, onlyDigits } from "./format";

const SIDE_CATEGORY = "acompanhamentos";

/** Monta a mensagem do pedido no padrão combinado com o cliente. */
export function buildOrderMessage({ items, note, total, settings, categories }) {
  const categoryName = (id) => categories.find((c) => c.id === id)?.name || "";
  const isSide = (item) =>
    categoryName(item.categoryId).toLowerCase() === SIDE_CATEGORY;

  const dishes = items.filter((item) => !isSide(item));
  const sides = items.filter(isSide);

  const lines = [settings?.defaultMessage || "Olá! Gostaria de fazer um pedido."];

  if (dishes.length) {
    lines.push("", "*Pedido*");
    dishes.forEach((item) => lines.push(`${item.quantity}x ${item.name}`));
  }

  if (sides.length) {
    lines.push("", "*Acompanhamentos*");
    sides.forEach((item) => lines.push(`${item.quantity}x ${item.name}`));
  }

  const notes = items
    .filter((item) => item.note)
    .map((item) => `${item.name}: ${item.note}`);
  if (note) notes.push(note);

  if (notes.length) {
    lines.push("", "*Observação*", ...notes);
  }

  lines.push("", "*Total*", formatPrice(total));

  return lines.join("\n");
}

export function buildWhatsappUrl(phone, message) {
  return `https://wa.me/${onlyDigits(phone)}?text=${encodeURIComponent(message)}`;
}
