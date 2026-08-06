import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { categoryService } from '../services/categoryService';

const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState(() => categoryService.list());

    const saveCategory = useCallback((category) => {
        const next = categoryService.save(category);
        setCategories(next);
        return next;
    }, []);

    const removeCategory = useCallback((id) => {
        const next = categoryService.remove(id);
        setCategories(next);
        return next;
    }, []);

    const value = useMemo(() => ({ categories, saveCategory, removeCategory }), [categories, saveCategory, removeCategory]);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

export function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) throw new Error('useCategories must be used within CategoriesProvider');
    return context;
}
