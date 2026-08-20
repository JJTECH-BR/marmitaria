import storage from "./localStorageService";
import { uid } from "../utils/uid";

interface SeedCategory {
  id: string;
  name: string;
}

interface SeedSize {
  value: number | string;
  label: string;
  price: number;
}

interface SeedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  type: string;
  available: boolean;
  price?: number;
  sizes?: SeedSize[];
  proteins?: string[];
  sides?: string[];
}

interface SeedCompany {
  name: string;
  whatsapp: string;
  phone: string;
  logo: string;
  banner: string;
  address: string;
  schedule: string;
}

interface SeedSettings {
  defaultMessage?: string;
}

const SEED_VERSION_KEY = "marmitaria:seedVersion";
const SEED_VERSION = "mvp-v19";

export const DEFAULT_COMPANY: SeedCompany = {
  name: "JJ Tech Marmitaria",
  whatsapp: "5584996970693",
  phone: "(84) 99697-0693",
  logo: "/logo-jjtech.jpeg",
  banner: "/images/banner.jpg",
  address: "Av. Tecnologia, 500 — Centro",
  schedule: "Seg a Sáb — 11h às 14h30",
};

export const DEFAULT_SETTINGS: SeedSettings = {
  defaultMessage: "Olá! Gostaria de fazer um pedido.",
};

function byName(categories: SeedCategory[], name: string): string {
  return categories.find((c) => c.name === name)!.id;
}

function buildSeed(): { categories: SeedCategory[]; products: SeedProduct[] } {
  const categories: SeedCategory[] = [
    { id: uid(), name: "Marmitas Tradicionais" },
    { id: uid(), name: "Promocional do Dia" },
    { id: uid(), name: "Pratos Individuais" },
    { id: uid(), name: "Acompanhamentos" },
  ];

  const tradicionais = byName(categories, "Marmitas Tradicionais");
  const pratoDoDia = byName(categories, "Promocional do Dia");
  const individuais = byName(categories, "Pratos Individuais");
  const acompanhamentos = byName(categories, "Acompanhamentos");

  const products: SeedProduct[] = [
    {
      name: "Marmita Fitness",
      description: "Escolha o tamanho, 2 proteínas e os acompanhamentos saudáveis.",
      image: "/images/frango.jpg",
      categoryId: tradicionais,
      type: "prato-do-dia",
      sizes: [
        { value: 400, label: "P 400g (prato quadrado)", price: 18 },
        { value: 550, label: "M 550g (prato redondo)", price: 22 },
        { value: 700, label: "G 700g (prato redondo)", price: 27 },
      ],
      proteins: [
        "Peito de Frango Grelhado",
        "Filé de Tilápia",
        "Carne Seca Desfiada",
        "Ovo Cozido",
        "Tofu Temperado",
        "Frango com Curry",
        "Calabresa Low Carb",
      ],
      sides: [
        "Arroz Integral", "Feijão Preto", "Feijão Carioca", "Macarrão", "Purê de Abacate",
        "Farofa de Pão", "Vinagrete", "Beterraba Ralada", "Pepino", "Cenoura Ralada",
        "Legumes Refogados", "Salada Verde"
      ]
    },
    {
      name: "Frango com Batata",
      description: "500g de frango temperado. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 19 }],
    },
    {
      name: "Strogonoff de Frango",
      description: "500g de strogonoff cremoso. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 20 }],
    },
    {
      name: "Escondidinho de Carne",
      description: "500g de escondidinho caseiro. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 22 }],
    },
    {
      name: "Picanha na Chapa",
      description: "500g de picanha suculenta. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 29 }],
    },
    {
      name: "Bife a Cavalo",
      description: "500g de bife com ovo frito. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 25 }],
    },
    {
      name: "Costela no Bafo",
      description: "500g de costela desfiada. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 26 }],
    },
    {
      name: "Filé de Tilápia Empanado",
      description: "Filé de tilápia empanado crocante, acompanha arroz e vinagrete.",
      image: "/images/peixe.jpg",
      categoryId: individuais,
      type: "individual",
      sizes: [
        { value: "P", label: "P", price: 22 },
        { value: "M", label: "M", price: 29 },
        { value: "G", label: "G", price: 37 },
      ],
    },
    {
      name: "Espaguete à Bolonhesa",
      description: "Espaguete com molho bolonhesa caseiro, acompanha farofa e salada.",
      image: "/images/carne.jpg",
      categoryId: individuais,
      type: "individual",
      sizes: [
        { value: "P", label: "P", price: 18 },
        { value: "M", label: "M", price: 24 },
        { value: "G", label: "G", price: 30 },
      ],
    },
    {
      name: "Batata Ovinha",
      description: "Porção de batata ovinha crocante.",
      image: "/images/batatinha-frita.jpg",
      price: 10,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Batata Palha",
      description: "Porção de batata palha sequinha.",
      image: "/images/batata-palha.jpg",
      price: 5,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Arroz Integral",
      description: "Porção de arroz integral soltinho.",
      image: "/images/arroz.jpg",
      price: 5,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Feijão Tropeiro",
      description: "Porção de feijão tropeiro mineiro.",
      image: "/images/feijao.jpg",
      price: 6,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Farofa Premium",
      description: "Farofa crocante com bacon e linguicça.",
      image: "/images/farofa.jpg",
      price: 5,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Salada Caesar",
      description: "Alface, croutons, parmesão e molho caesar.",
      image: "/images/salada.jpg",
      price: 8,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
  ].map((product) => ({ id: uid(), available: true, ...product }));

  return { categories, products };
}

export function seedIfEmpty(): void {
  const seededVersion = readSeedVersion();
  const needsSeed = !storage.hasData() || seededVersion !== SEED_VERSION;

  if (!needsSeed) return;

  const { categories, products } = buildSeed();
  storage.saveCompany(DEFAULT_COMPANY);
  if (!storage.getSettings()) storage.saveSettings(DEFAULT_SETTINGS);
  window.localStorage.setItem("marmitaria:adminPin", "1234");
  storage.saveCategories(categories);
  storage.saveProducts(products);
  writeSeedVersion();
}

function readSeedVersion(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SEED_VERSION_KEY);
  } catch {
    return null;
  }
}

function writeSeedVersion(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  } catch {
    /* noop */
  }
}
