import test from 'node:test';
import assert from 'node:assert/strict';
import { login, logout, isAuthenticated, getAuthSession } from './authService.js';

const originalLocalStorage = globalThis.localStorage;

test.beforeEach(() => {
    globalThis.localStorage = {
        store: {},
        getItem(key) {
            return this.store[key] ?? null;
        },
        setItem(key, value) {
            this.store[key] = String(value);
        },
        removeItem(key) {
            delete this.store[key];
        },
        clear() {
            this.store = {};
        },
    };
});

test.afterEach(() => {
    globalThis.localStorage = originalLocalStorage;
});

test('login salva sessão válida e isAuthenticated retorna true', () => {
    const session = login('1234');
    assert.equal(session.authenticated, true);
    assert.equal(isAuthenticated(), true);
    assert.deepEqual(getAuthSession(), session);
});

test('isAuthenticated retorna false após expiração', () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    globalThis.localStorage.setItem('marmitaria:auth', JSON.stringify({ authenticated: true, expiresAt: past }));
    assert.equal(isAuthenticated(), false);
    assert.equal(logout(), true);
});
