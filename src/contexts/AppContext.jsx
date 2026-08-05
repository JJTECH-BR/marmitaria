import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import storage from "../services/localStorageService";
import { seedIfEmpty } from "../services/seedService";
import { uid } from "../utils/uid";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [company, setCompany] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    seedIfEmpty();
    setProducts(storage.getProducts());
    setCategories(storage.getCategories());
    setOrders(storage.getOrders());
    setCompany(storage.getCompany());
    setSettings(storage.getSettings());
    setLoading(false);
  }, []);

  const persistProducts = useCallback((next) => {
    setProducts(next);
    storage.saveProducts(next);
  }, []);

  const persistCategories = useCallback((next) => {
    setCategories(next);
    storage.saveCategories(next);
  }, []);

  const persistOrders = useCallback((next) => {
    setOrders(next);
    storage.saveOrders(next);
  }, []);

  const saveProduct = useCallback(
    (product) => {
      const next = product.id
        ? products.map((item) => (item.id === product.id ? { ...item, ...product } : item))
        : [...products, { ...product, id: uid() }];
      persistProducts(next);
    },
    [products, persistProducts],
  );

  const removeProduct = useCallback(
    (id) => persistProducts(products.filter((item) => item.id !== id)),
    [products, persistProducts],
  );

  const saveCategory = useCallback(
    (category) => {
      const next = category.id
        ? categories.map((item) => (item.id === category.id ? { ...item, ...category } : item))
        : [...categories, { ...category, id: uid() }];
      persistCategories(next);
    },
    [categories, persistCategories],
  );

  const removeCategory = useCallback(
    (id) => persistCategories(categories.filter((item) => item.id !== id)),
    [categories, persistCategories],
  );

  const saveCompanyData = useCallback((data) => {
    setCompany(data);
    storage.saveCompany(data);
  }, []);

  const saveSettingsData = useCallback((data) => {
    setSettings(data);
    storage.saveSettings(data);
  }, []);

  const createOrder = useCallback(
    (order) => {
      const newOrder = {
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
      categoryName: (id) => categories.find((c) => c.id === id)?.name || "—",
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

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de AppProvider");
  return context;
}
