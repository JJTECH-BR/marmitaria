import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import storage from "../services/localStorageService";

const DEMO_MAX_CART_ITEMS = 5;
const DEMO_MAX_ORDERS = 3;

interface DemoContextValue {
  isDemo: true;
  orderCount: number;
  maxOrders: number;
  maxCartItems: number;
  canPlaceOrder: boolean;
  canAddToCart: (currentCartCount: number) => boolean;
  incrementOrderCount: () => void;
  remainingOrders: number;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [orderCount, setOrderCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrderCount(storage.getDemoOrderCount());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) storage.saveDemoOrderCount(orderCount);
  }, [orderCount, ready]);

  const incrementOrderCount = useCallback(() => {
    setOrderCount((c) => c + 1);
  }, []);

  const canPlaceOrder = orderCount < DEMO_MAX_ORDERS;

  const canAddToCart = useCallback((currentCartCount: number) => {
    return currentCartCount < DEMO_MAX_CART_ITEMS;
  }, []);

  const value = useMemo(
    () => ({
      isDemo: true as const,
      orderCount,
      maxOrders: DEMO_MAX_ORDERS,
      maxCartItems: DEMO_MAX_CART_ITEMS,
      canPlaceOrder,
      canAddToCart,
      incrementOrderCount,
      remainingOrders: Math.max(0, DEMO_MAX_ORDERS - orderCount),
    }),
    [orderCount, canPlaceOrder, canAddToCart, incrementOrderCount],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo deve ser usado dentro de DemoProvider");
  return context;
}
