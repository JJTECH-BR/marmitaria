/**
 * Camada única de acesso à persistência.
 * Os componentes NUNCA acessam o localStorage diretamente.
 * Para migrar para uma API REST no futuro, basta trocar o corpo
 * destas funções (mantendo a mesma assinatura) — nenhum componente muda.
 */

const KEYS = {
  products: "marmitaria:products",
  categories: "marmitaria:categories",
  settings: "marmitaria:settings",
  orders: "marmitaria:orders",
  company: "marmitaria:company",
  cart: "marmitaria:cart",
};

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

function read(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`[storage] falha ao ler ${key}`, error);
    return fallback;
  }
}

function write(key, value) {
  if (!isBrowser()) return value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] falha ao salvar ${key}`, error);
  }
  return value;
}

export const getProducts = () => read(KEYS.products, []);
export const saveProducts = (products) => write(KEYS.products, products);

export const getCategories = () => read(KEYS.categories, []);
export const saveCategories = (categories) => write(KEYS.categories, categories);

export const getSettings = () => read(KEYS.settings, null);
export const saveSettings = (settings) => write(KEYS.settings, settings);

export const getOrders = () => read(KEYS.orders, []);
export const saveOrders = (orders) => write(KEYS.orders, orders);

export const getCompany = () => read(KEYS.company, null);
export const saveCompany = (company) => write(KEYS.company, company);

export const getCart = () => read(KEYS.cart, []);
export const saveCart = (cart) => write(KEYS.cart, cart);

export const hasData = () => !!getCompany() && getCategories().length > 0;

export default {
  getProducts,
  saveProducts,
  getCategories,
  saveCategories,
  getSettings,
  saveSettings,
  getOrders,
  saveOrders,
  getCompany,
  saveCompany,
  getCart,
  saveCart,
  hasData,
};
