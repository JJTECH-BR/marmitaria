import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import storage from "../services/localStorageService";
import { seedIfEmpty } from "../services/seedService";
import { uid } from "../utils/uid";

interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  image: string;
  categoryId: string;
  type: string;
  price?: number | string;
  available?: boolean;
  [key: string]: unknown;
}

interface Order {
  id: string;
  status: string;
  data: string;
  [key: string]: unknown;
}

interface Company {
  name: string;
  whatsapp: string;
  phone: string;
  logo: string;
  banner: string;
  address: string;
  schedule: string;
}

interface Settings {
  defaultMessage: string;
}

interface AppContextValue {
  loading: boolean;
  products: Product[];
  categories: Category[];
  orders: Order[];
  company: Company | null;
  settings: Settings | null;
  saveProduct: (product: Partial<Product> & { id?: string }) => void;
  removeProduct: (id: string) => void;
  saveCategory: (category: Partial<Category> & { id?: string }) => void;
  removeCategory: (id: string) => void;
  saveCompany: (data: Company) => void;
  saveSettings: (data: Settings) => void;
  createOrder: (order: Omit<Order, "id" | "status" | "data">) => Order;
  categoryName: (id: string) => string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    seedIfEmpty();
    setProducts(storage.getProducts() as Product[]);
    setCategories(storage.getCategories() as Category[]);
    setOrders(storage.getOrders() as Order[]);
    setCompany(storage.getCompany() as Company | null);
    setSettings(storage.getSettings() as Settings | null);
    setLoading(false);
  }, []);

  const persistProducts = useCallback((next: Product[]) => {
    setProducts(next);
    storage.saveProducts(next as never);
  }, []);

  const persistCategories = useCallback((next: Category[]) => {
    setCategories(next);
    storage.saveCategories(next as never);
  }, []);

  const persistOrders = useCallback((next: Order[]) => {
    setOrders(next);
    storage.saveOrders(next as never);
  }, []);

  const saveProduct = useCallback(
    (product: Partial<Product> & { id?: string }) => {
      const next = product.id
        ? products.map((item) => (item.id === product.id ? { ...item, ...product } : item))
        : [...products, { ...product, id: uid() } as Product];
      persistProducts(next);
    },
    [products, persistProducts],
  );

  const removeProduct = useCallback(
    (id: string) => persistProducts(products.filter((item) => item.id !== id)),
    [products, persistProducts],
  );

  const saveCategory = useCallback(
    (category: Partial<Category> & { id?: string }) => {
      const next = category.id
        ? categories.map((item) => (item.id === category.id ? { ...item, ...category } : item))
        : [...categories, { ...category, id: uid() } as Category];
      persistCategories(next);
    },
    [categories, persistCategories],
  );

  const removeCategory = useCallback(
    (id: string) => persistCategories(categories.filter((item) => item.id !== id)),
    [categories, persistCategories],
  );

  const saveCompanyData = useCallback((data: Company) => {
    setCompany(data);
    storage.saveCompany(data);
  }, []);

  const saveSettingsData = useCallback((data: Settings) => {
    setSettings(data);
    storage.saveSettings(data);
  }, []);

  const createOrder = useCallback(
    (order: Omit<Order, "id" | "status" | "data">) => {
      const newOrder: Order = {
        id: uid(),
        status: "Novo",
        data: new Date().toISOString(),
        ...order,
      };
      persistOrders([newOrder, ...orders]);
      return newOrder;
    },
    [orders, persistOrders],
  );

  const value = useMemo(
    () => ({
      loading,
      products,
      categories,
      orders,
      company,
      settings,
      saveProduct,
      removeProduct,
      saveCategory,
      removeCategory,
      saveCompany: saveCompanyData,
      saveSettings: saveSettingsData,
      createOrder,
      categoryName: (id: string) => categories.find((c) => c.id === id)?.name || "—",
    }),
    [
      loading,
      products,
      categories,
      orders,
      company,
      settings,
      saveProduct,
      removeProduct,
      saveCategory,
      removeCategory,
      saveCompanyData,
      saveSettingsData,
      createOrder,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de AppProvider");
  return context;
}
