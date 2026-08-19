import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import storage from "../services/localStorageService";
import { uid } from "../utils/uid";
import type { SizeOption, FriesOption, PremiumMeat } from "../constants/menu";

interface Product {
  id: string;
  name: string;
  image: string;
  categoryId: string;
  type: string;
  price?: number | string;
  [key: string]: unknown;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  categoryId: string;
  type: string;
  unitPrice: number;
  size: SizeOption | null;
  proteins: string[];
  fries: FriesOption | null;
  sides: string[];
  meat: PremiumMeat | null;
  quantity: number;
  note: string;
}

interface CartCustomization {
  size?: SizeOption | null;
  proteins?: string[];
  fries?: FriesOption | null;
  sides?: string[];
  meat?: PremiumMeat | null;
}

interface CartContextValue {
  items: CartItem[];
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  addItem: (product: Product, quantity?: number, itemNote?: string, customization?: CartCustomization) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function itemKey(item: CartItem): string {
  return [
    item.productId,
    item.note,
    item.size?.value,
    (item.proteins || []).join("|"),
    item.fries,
    (item.sides || []).join("|"),
    item.meat?.id || "",
  ].join("__");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(storage.getCart() as CartItem[]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) storage.saveCart(items);
  }, [items, ready]);

  const addItem = useCallback((product: Product, quantity = 1, itemNote = "", customization: CartCustomization = {}) => {
    const { size, proteins, fries, sides, meat } = customization;
    const unitPrice = size
      ? Number(size.price || 0) + (meat?.extra || 0)
      : Number(product.price) || 0;

    const nextItem: CartItem = {
      id: uid(),
      productId: product.id,
      name: product.name,
      image: product.image,
      categoryId: product.categoryId,
      type: product.type,
      unitPrice,
      size: size || null,
      proteins: proteins || [],
      fries: fries || null,
      sides: sides || [],
      meat: meat || null,
      quantity,
      note: itemNote,
    };

    setItems((current) => {
      const existing = current.find((item) => itemKey(item) === itemKey(nextItem));
      if (existing) {
        return current.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, nextItem];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback(
    (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setNote("");
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      note,
      setNote,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      subtotal,
      total: subtotal,
      count,
    }),
    [items, note, addItem, updateQuantity, removeItem, clearCart, subtotal, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
