import { useMemo } from "react";
import { useApp } from "../contexts/AppContext";

/** Agrupa produtos disponíveis por nome de categoria. */
export function useMenu() {
  const { products, categories, loading } = useApp();

  return useMemo(() => {
    const available = products.filter((product) => product.available);
    const byCategoryName = (name) => {
      const category = categories.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      );
      return category ? available.filter((p) => p.categoryId === category.id) : [];
    };

    return {
      loading,
      categories,
      available,
      dailyDishes: byCategoryName("Prato do Dia"),
      fixedDishes: byCategoryName("Pratos Fixos"),
      sides: byCategoryName("Acompanhamentos"),
      byCategoryName,
    };
  }, [products, categories, loading]);
}
