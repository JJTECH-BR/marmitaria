interface CompanyData {
  name: string;
  whatsapp: string;
  phone: string;
  logo: string;
  banner: string;
  address: string;
  schedule: string;
}

interface Settings {
  defaultMessage?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  type: string;
  available: boolean;
  price?: number;
  sizes?: { value: number | string; label: string; price: number }[];
  proteins?: string[];
  sides?: string[];
}

interface Order {
  id: string;
  status: string;
  data: string;
  items: unknown[];
  note?: string;
  total?: number;
  [key: string]: unknown;
}

const KEYS = {
  products: "marmitaria:products",
  categories: "marmitaria:categories",
  settings: "marmitaria:settings",
  orders: "marmitaria:orders",
  company: "marmitaria:company",
  cart: "marmitaria:cart",
  demoOrderCount: "marmitaria:demoOrderCount",
} as const;

const isBrowser = (): boolean => typeof window !== "undefined" && !!window.localStorage;

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
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

export const getProducts = (): Product[] => read<Product[]>(KEYS.products, []);
export const saveProducts = (products: Product[]): Product[] => write<Product[]>(KEYS.products, products);

export const getCategories = (): Category[] => read<Category[]>(KEYS.categories, []);
export const saveCategories = (categories: Category[]): Category[] => write<Category[]>(KEYS.categories, categories);

export const getSettings = (): Settings | null => read<Settings | null>(KEYS.settings, null);
export const saveSettings = (settings: Settings | null): Settings | null => write<Settings | null>(KEYS.settings, settings);

export const getOrders = (): Order[] => read<Order[]>(KEYS.orders, []);
export const saveOrders = (orders: Order[]): Order[] => write<Order[]>(KEYS.orders, orders);

export const getCompany = (): CompanyData | null => read<CompanyData | null>(KEYS.company, null);
export const saveCompany = (company: CompanyData | null): CompanyData | null => write<CompanyData | null>(KEYS.company, company);

export const getCart = (): unknown[] => read<unknown[]>(KEYS.cart, []);
export const saveCart = (cart: unknown[]): unknown[] => write<unknown[]>(KEYS.cart, cart);

export const getDemoOrderCount = (): number => read<number>(KEYS.demoOrderCount, 0);
export const saveDemoOrderCount = (count: number): number => write<number>(KEYS.demoOrderCount, count);

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
  getDemoOrderCount,
  saveDemoOrderCount,
  hasData,
};
