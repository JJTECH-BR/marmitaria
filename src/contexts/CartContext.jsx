import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import storage from "../services/localStorageService";
import { uid } from "../utils/uid";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(storage.getCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) storage.saveCart(items);
  }, [items, ready]);

  const addItem = useCallback((product, quantity = 1, itemNote = "") => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.productId === product.id && item.note === itemNote,
      );
      if (existing) {
        return current.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...current,
        {
          id: uid(),
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          categoryId: product.categoryId,
          quantity,
          note: itemNote,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback(
    (id) => setItems((current) => current.filter((item) => item.id !== id)),
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setNote("");
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
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

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
