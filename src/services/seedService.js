import storage from "./localStorageService";
import { uid } from "../utils/uid";

export const DEFAULT_COMPANY = {
  name: "Tempero Marmitaria",
  whatsapp: "558499999999",
  logo: "/images/logo.png",
  banner: "/images/banner.jpg",
  address: "Av. Principal, 1200 — Centro",
  schedule: "Seg a Sáb — 10h às 15h",
};

export const DEFAULT_SETTINGS = {
  defaultMessage: "Olá! Gostaria de fazer um pedido.",
};

const CATEGORY_NAMES = [
  "Prato do Dia",
  "Pratos Fixos",
  "Acompanhamentos",
  "Bebidas",
  "Sobremesas",
];

function buildSeed() {
  const categories = CATEGORY_NAMES.map((name) => ({ id: uid(), name }));
  const byName = (name) => categories.find((c) => c.name === name).id;

  const products = [
    {
      name: "Frango Grelhado",
      description: "Filé de frango grelhado, arroz branco, feijão e salada.",
      price: 22.9,
      image: "/images/frango.jpg",
      categoryId: byName("Prato do Dia"),
    },
    {
      name: "Carne de Panela",
      description: "Carne cozida no molho caseiro com arroz e farofa.",
      price: 26.5,
      image: "/images/carne.jpg",
      categoryId: byName("Prato do Dia"),
    },
    {
      name: "Feijoada Completa",
      description: "Feijoada tradicional com arroz, couve e laranja.",
      price: 29.9,
      image: "/images/feijoada.jpg",
      categoryId: byName("Pratos Fixos"),
    },
    {
      name: "Peixe Assado",
      description: "Filé de peixe assado com legumes e arroz temperado.",
      price: 27.9,
      image: "/images/peixe.jpg",
      categoryId: byName("Pratos Fixos"),
    },
    {
      name: "Arroz Branco",
      description: "Porção de arroz soltinho.",
      price: 4,
      image: "",
      categoryId: byName("Acompanhamentos"),
    },
    {
      name: "Feijão Carioca",
      description: "Porção de feijão temperado na hora.",
      price: 4,
      image: "",
      categoryId: byName("Acompanhamentos"),
    },
    {
      name: "Farofa da Casa",
      description: "Farofa crocante com bacon.",
      price: 3.5,
      image: "",
      categoryId: byName("Acompanhamentos"),
    },
    {
      name: "Refrigerante Lata",
      description: "350ml gelado.",
      price: 6,
      image: "",
      categoryId: byName("Bebidas"),
    },
    {
      name: "Pudim de Leite",
      description: "Fatia generosa de pudim caseiro.",
      price: 8.5,
      image: "",
      categoryId: byName("Sobremesas"),
    },
  ].map((product) => ({ id: uid(), available: true, ...product }));

  return { categories, products };
}

/** Cria os dados iniciais apenas no primeiro acesso. */
export function seedIfEmpty() {
  if (storage.hasData()) return;

  const { categories, products } = buildSeed();
  storage.saveCompany(DEFAULT_COMPANY);
  storage.saveSettings(DEFAULT_SETTINGS);
  storage.saveCategories(categories);
  storage.saveProducts(products);
  storage.saveOrders(storage.getOrders());
}
