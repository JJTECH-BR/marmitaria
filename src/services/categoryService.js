import storage from './localStorageService';
import { uid } from '../utils/uid';

export const categoryService = {
  list: () => storage.getCategories(),
  save(category) {
    const categories = storage.getCategories();
    const next = category.id
      ? categories.map((item) => (item.id === category.id ? { ...item, ...category } : item))
      : [...categories, { ...category, id: uid() }];
    storage.saveCategories(next);
    return next;
  },
  remove(id) {
    const next = storage.getCategories().filter((item) => item.id !== id);
    storage.saveCategories(next);
    return next;
  },
};
