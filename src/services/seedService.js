import storage from "./localStorageService";
import { uid } from "../utils/uid";

const SEED_VERSION_KEY = "marmitaria:seedVersion";
const SEED_VERSION = "mvp-v17";

export const DEFAULT_COMPANY = {
  name: "Tempero Marmitaria",
  whatsapp: "5584999036688",
  phone: "(84) 99903-6688",
  logo: "/images/logo-marmitaria.jpeg",
  banner: "/images/banner.jpg",
  address: "Av. Principal, 1200 — Centro",
  schedule: "Seg a Sáb — 10h às 15h",
};

export const DEFAULT_SETTINGS = {
  defaultMessage: "Olá! Gostaria de fazer um pedido.",
};

function byName(categories, name) {
  return categories.find((c) => c.name === name).id;
}

function buildSeed() {
  const categories = [
    { id: uid(), name: "Marmitas Tradicionais" },
    { id: uid(), name: "Promocional do Dia" },
    { id: uid(), name: "Pratos Individuais" },
    { id: uid(), name: "Acompanhamentos" },
  ];

  const tradicionais = byName(categories, "Marmitas Tradicionais");
  const pratoDoDia = byName(categories, "Promocional do Dia");
  const individuais = byName(categories, "Pratos Individuais");
  const acompanhamentos = byName(categories, "Acompanhamentos");

  const products = [
    {
      name: "Marmita Tradicional",
      description: "Escolha o tamanho, 2 proteínas e os acompanhamentos.",
      image: "/images/frango.jpg",
      categoryId: tradicionais,
      type: "prato-do-dia",
      sizes: [
        { value: 400, label: "P 400g (prato quadrado)", price: 15 },
        { value: 550, label: "M 550g (prato redondo)", price: 19 },
        { value: 700, label: "G 700g (prato redondo)", price: 23 },
      ],
      proteins: [
        "Filé de Peito Grelhado",
        "Filé de Peito Empanado",
        "Frango a Parmegiana",
        "Lasanha de Frango",
        "Salpicão de Frango",
        "Creme de Frango",
        "Calabresa (com barbecue ou sem)",
      ],
      sides: [
        "Feijão Preto", "Feijão Carioca", "Arroz", "Macarrão", "Purê de Batata",
        "Farofa", "Vinagrete", "Beterraba Ralada", "Pepino", "Cenoura Ralada",
        "Batata e Cenoura com Maionese", "Batata e Cenoura"
      ]
    },
    {
      name: "Creme de Frango",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 17 }],
    },
    {
      name: "Salpicão de Frango",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 17 }],
    },
    {
      name: "Lasanha",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/frango.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 17 }],
    },
    {
      name: "Carne de Sol",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 21 }],
    },
    {
      name: "Bife Acebolado",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 21 }],
    },
    {
      name: "Bife ao Molho Madeira",
      description: "500g de comida. Acompanha arroz e batata frita ou batata palha.",
      image: "/images/carne.jpg",
      categoryId: pratoDoDia,
      type: "prato-do-dia",
      sizes: [{ value: 500, label: "500g", price: 21 }],
    },
    {
      name: "Prato Individual de Parmegiana de Frango",
      description: "Filé de frango empanado à parmegiana, acompanha arroz e batata frita.",
      image: "/images/frango.jpg",
      categoryId: individuais,
      type: "individual",
      sizes: [
        { value: "P", label: "P", price: 17 },
        { value: "M", label: "M", price: 24 },
        { value: "G", label: "G", price: 32 },
      ],
    },
    {
      name: "Prato Individual de Parmegiana de Carne",
      description: "Filé de carne empanado à parmegiana, acompanha arroz e batata frita.",
      image: "/images/carne.jpg",
      categoryId: individuais,
      type: "individual",
      sizes: [
        { value: "P", label: "P", price: 20 },
        { value: "M", label: "M", price: 27 },
        { value: "G", label: "G", price: 35 },
      ],
    },
    {
      name: "Batatinha Frita",
      description: "Porção crocante de batatinha frita.",
      image: "/images/batatinha-frita.jpg",
      price: 8,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Batata Palha",
      description: "Porção de batata palha sequinha.",
      image: "/images/batata-palha.jpg",
      price: 6,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Arroz Branco",
      description: "Porção de arroz soltinho.",
      image: "/images/arroz.jpg",
      price: 4,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Feijão Carioca",
      description: "Porção de feijão temperado na hora.",
      image: "/images/feijao.jpg",
      price: 4,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Farofa da Casa",
      description: "Farofa crocante com bacon.",
      image: "/images/farofa.jpg",
      price: 3.5,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
    {
      name: "Salada Mista",
      description: "Alface, tomate e cenoura ralada.",
      image: "/images/salada.jpg",
      price: 3.5,
      categoryId: acompanhamentos,
      type: "acompanhamento",
    },
  ].map((product) => ({ id: uid(), available: true, ...product }));

  return { categories, products };
}

export function seedIfEmpty() {
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

function readSeedVersion() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(SEED_VERSION_KEY);
  } catch {
    return null;
  }
}

function writeSeedVersion() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION);
  } catch {
    /* noop */
  }
}
