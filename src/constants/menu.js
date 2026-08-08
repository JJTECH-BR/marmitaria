export const PRODUCT_TYPES = [
  { id: "prato-do-dia", name: "Prato do Dia", short: "Pratos do Dia" },
  { id: "individual", name: "Prato Individual", short: "Pratos Individuais" },
  { id: "acompanhamento", name: "Acompanhamento", short: "Acompanhamentos" },
];

export const PRODUCT_TYPE_SHORT = Object.fromEntries(PRODUCT_TYPES.map((t) => [t.id, t.short]));

export const SIZES = [
  { value: 400, label: "400g", hint: "Ideal para uma pessoa" },
  { value: 550, label: "550g", hint: "Bem servida" },
  { value: 700, label: "700g", hint: "Para quem tem fome" },
];

export const FRIES_OPTIONS = [
  { id: "batata-frita", name: "Batatinha Frita" },
  { id: "batata-palha", name: "Batata Palha" },
];

export const PREMIUM_MEATS = [
  { id: "carne-sol", name: "Carne de Sol", extra: 4 },
  { id: "bife-acebolado", name: "Bife Acebolado", extra: 4 },
  { id: "molho-madeira", name: "Ao Molho Madeira", extra: 4 },
  { id: "empanado", name: "Empanado", extra: 4 },
  { id: "parmegiana", name: "À Parmegiana", extra: 4 },
];

export const EXTRA_MEAT_AMOUNT = 4;

export const CATEGORY_DEFAULTS = ["Prato do Dia", "Pratos Individuais", "Acompanhamentos"];
