const AUTH_KEY = "marmitaria:auth";
const DEFAULT_ADMIN_PIN = "1234";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

function isBrowser() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readSession() {
    if (!isBrowser()) return null;
    try {
        const value = window.localStorage.getItem(AUTH_KEY);
        return value ? JSON.parse(value) : null;
    } catch {
        return null;
    }
}

function writeSession(session) {
    if (!isBrowser()) return session;
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return session;
}

export function getAdminPin() {
    if (!isBrowser()) return DEFAULT_ADMIN_PIN;
    const stored = window.localStorage.getItem("marmitaria:adminPin");
    return stored || DEFAULT_ADMIN_PIN;
}

export function setAdminPin(pin) {
    if (!isBrowser()) return pin;
    window.localStorage.setItem("marmitaria:adminPin", pin);
    return pin;
}

export function login(pin) {
    if (pin !== getAdminPin()) {
        return { authenticated: false, error: "PIN inválido." };
    }

    const session = {
        authenticated: true,
        loginAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    };

    writeSession(session);
    return session;
}

export function logout() {
    if (!isBrowser()) return true;
    window.localStorage.removeItem(AUTH_KEY);
    return true;
}

export function getAuthSession() {
    const session = readSession();
    if (!session?.authenticated) return null;
    if (session.expiresAt && new Date(session.expiresAt).getTime() <= Date.now()) {
        logout();
        return null;
    }
    return session;
}

export function isAuthenticated() {
    return Boolean(getAuthSession());
}

export function requireAuth() {
    return isAuthenticated();
}
