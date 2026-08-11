/**
 * Camada única de acesso à persistência.
 * Os componentes NUNCA acessam o localStorage diretamente.
 * Para migrar para uma API REST no futuro, basta trocar o corpo
 * destas funções (mantendo a mesma assinatura) — nenhum componente muda.
 */

// 1. Interfaces (Tipagens)
// Defina os moldes das suas entidades. O [key: string]: any permite que 
// você passe propriedades dinâmicas por enquanto sem o TypeScript reclamar.
export interface Product {
  id?: string | number;
  [key: string]: any;
}

export interface Category {
  id?: string | number;
  [key: string]: any;
}

export interface Settings {
  [key: string]: any;
}

export interface Order {
  id?: string | number;
  [key: string]: any;
}

export interface Company {
  name?: string;
  [key: string]: any;
}

export interface CartItem {
  productId?: string | number;
  quantity?: number;
  [key: string]: any;
}

// 2. Chaves do LocalStorage
const KEYS = {
  products: "marmitaria:products",
  categories: "marmitaria:categories",
  settings: "marmitaria:settings",
  orders: "marmitaria:orders",
  company: "marmitaria:company",
  cart: "marmitaria:cart",
};

const isBrowser = (): boolean => typeof window !== "undefined" && !!window.localStorage;

// 3. Funções Genéricas de Leitura e Escrita
// O <T> avisa ao TypeScript que o tipo de retorno será igual ao tipo do fallback
function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.error(`[storage] falha ao ler ${key}`, error);
    return fallback;
  }
}

function write<T>(key: string, value: T): T {
  if (!isBrowser()) return value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] falha ao salvar ${key}`, error);
  }
  return value;
}

// 4. Métodos Exportados com suas respectivas tipagens
export const getProducts = (): Product[] => read<Product[]>(KEYS.products, []);
export const saveProducts = (products: Product[]): Product[] => write<Product[]>(KEYS.products, products);

export const getCategories = (): Category[] => read<Category[]>(KEYS.categories, []);
export const saveCategories = (categories: Category[]): Category[] => write<Category[]>(KEYS.categories, categories);

export const getSettings = (): Settings | null => read<Settings | null>(KEYS.settings, null);
export const saveSettings = (settings: Settings): Settings => write<Settings>(KEYS.settings, settings);

export const getOrders = (): Order[] => read<Order[]>(KEYS.orders, []);
export const saveOrders = (orders: Order[]): Order[] => write<Order[]>(KEYS.orders, orders);

export const getCompany = (): Company | null => read<Company | null>(KEYS.company, null);
export const saveCompany = (company: Company): Company => write<Company>(KEYS.company, company);

export const getCart = (): CartItem[] => read<CartItem[]>(KEYS.cart, []);
export const saveCart = (cart: CartItem[]): CartItem[] => write<CartItem[]>(KEYS.cart, cart);

export const hasData = (): boolean => !!getCompany() && getCategories().length > 0;

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