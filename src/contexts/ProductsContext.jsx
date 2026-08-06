import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { productService } from '../services/productService';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState(() => productService.list());

    const saveProduct = useCallback((product) => {
        const next = productService.save(product);
        setProducts(next);
        return next;
    }, []);

    const removeProduct = useCallback((id) => {
        const next = productService.remove(id);
        setProducts(next);
        return next;
    }, []);

    const toggleAvailability = useCallback((id) => {
        const next = productService.toggleAvailability(id);
        setProducts(next);
        return next;
    }, []);

    const value = useMemo(() => ({
        products,
        saveProduct,
        removeProduct,
        toggleAvailability,
    }), [products, saveProduct, removeProduct, toggleAvailability]);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) throw new Error('useProducts must be used within ProductsProvider');
    return context;
}
