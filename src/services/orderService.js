import storage from './localStorageService';
import { uid } from '../utils/uid';

export const orderService = {
    list: () => storage.getOrders(),
    create(order) {
        const orders = storage.getOrders();
        const nextOrder = {
            id: uid(),
            status: 'Novo',
            data: new Date().toISOString(),
            ...order,
        };
        const next = [nextOrder, ...orders];
        storage.saveOrders(next);
        return nextOrder;
    },
};
