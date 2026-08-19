export const formatPrice = (value: number | string | null | undefined): string =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);

export const formatDate = (iso: string | null | undefined): string => {
  if (!iso) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
};

export const onlyDigits = (value: string | number | null | undefined): string =>
  String(value || "").replace(/\D/g, "");
