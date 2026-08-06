import storage from './localStorageService';
import { uid } from '../utils/uid';

const PRODUCT_KEY = 'marmitaria:products';

function readProducts() {
  return storage.getProducts();
}

function writeProducts(products) {
  storage.saveProducts(products);
  return products;
}

export const productService = {
  list: () => readProducts(),
  save(product) {
    const products = readProducts();
    const next = product.id
      ? products.map((item) => (item.id === product.id ? { ...item, ...product } : item))
      : [...products, { ...product, id: uid(), available: product.available ?? true }];
    return writeProducts(next);
  },
  remove(id) {
    const next = readProducts().filter((item) => item.id !== id);
    return writeProducts(next);
  },
  toggleAvailability(id) {
    const next = readProducts().map((item) => (item.id === id ? { ...item, available: !item.available } : item));
    return writeProducts(next);
  },
  getById(id) {
    return readProducts().find((item) => item.id === id) ?? null;
  },
  getVisible() {
    return readProducts().filter((item) => item.available);
  },
};

export function seedProductsIfNeeded() {
  if (storage.getProducts().length) return;
  const seed = [];
  return writeProducts(seed);
}
