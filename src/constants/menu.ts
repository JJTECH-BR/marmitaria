// 1. Interfaces definindo o formato de cada tipo de dado
export interface ProductType {
  id: string;
  name: string;
  short: string;
}

export interface ProductSize {
  value: number;
  label: string;
  hint: string;
}

export interface FriesOption {
  id: string;
  name: string;
}

export interface PremiumMeat {
  id: string;
  name: string;
  extra: number;
}

// 2. Constantes exportadas com suas respectivas tipagens
export const PRODUCT_TYPES: ProductType[] = [
  { id: "prato-do-dia", name: "Prato do Dia", short: "Pratos do Dia" },
  { id: "individual", name: "Prato Individual", short: "Pratos Individuais" },
  { id: "acompanhamento", name: "Acompanhamento", short: "Acompanhamentos" },
];

// O tipo Record<string, string> avisa que isso é um objeto onde as chaves e valores são textos (ex: { "prato-do-dia": "Pratos do Dia" })
export const PRODUCT_TYPE_SHORT: Record<string, string> = Object.fromEntries(
  PRODUCT_TYPES.map((t) => [t.id, t.short])
);

export const SIZES: ProductSize[] = [
  { value: 400, label: "400g", hint: "Ideal para uma pessoa" },
  { value: 550, label: "550g", hint: "Bem servida" },
  { value: 700, label: "700g", hint: "Para quem tem fome" },
];

export const FRIES_OPTIONS: FriesOption[] = [
  { id: "batata-frita", name: "Batatinha Frita" },
  { id: "batata-palha", name: "Batata Palha" },
];

export const PREMIUM_MEATS: PremiumMeat[] = [
  { id: "carne-sol", name: "Carne de Sol", extra: 4 },
  { id: "bife-acebolado-molho-madeira", name: "Bife Acebolado ao Molho Madeira", extra: 4 },
  { id: "empanado-parmegiana", name: "Empanado e À Parmegiana", extra: 4 },
];

export const EXTRA_MEAT_AMOUNT: number = 4;

export const CATEGORY_DEFAULTS: string[] = ["Prato do Dia", "Pratos Individuais", "Acompanhamentos"];