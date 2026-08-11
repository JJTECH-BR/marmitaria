const AUTH_KEY = "marmitaria:auth";
const DEFAULT_ADMIN_PIN = "1234";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

// Definindo o formato da Sessão para o Autocomplete do VS Code
export interface AuthSession {
  authenticated: boolean;
  loginAt?: string;
  expiresAt?: string;
  error?: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readSession(): AuthSession | null {
  if (!isBrowser()) return null;
  try {
    const value = window.localStorage.getItem(AUTH_KEY);
    return value ? (JSON.parse(value) as AuthSession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession): AuthSession {
  if (!isBrowser()) return session;
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  return session;
}

export function getAdminPin(): string {
  if (!isBrowser()) return DEFAULT_ADMIN_PIN;
  const stored = window.localStorage.getItem("marmitaria:adminPin");
  return stored || DEFAULT_ADMIN_PIN;
}

export function setAdminPin(pin: string): string {
  if (!isBrowser()) return pin;
  window.localStorage.setItem("marmitaria:adminPin", pin);
  return pin;
}

export function login(pin: string): AuthSession {
  if (pin !== getAdminPin()) {
    return { authenticated: false, error: "PIN inválido." };
  }

  const session: AuthSession = {
    authenticated: true,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };

  writeSession(session);
  return session;
}

export function logout(): boolean {
  if (!isBrowser()) return true;
  window.localStorage.removeItem(AUTH_KEY);
  return true;
}

export function getAuthSession(): AuthSession | null {
  const session = readSession();
  if (!session?.authenticated) return null;
  if (session.expiresAt && new Date(session.expiresAt).getTime() <= Date.now()) {
    logout();
    return null;
  }
  return session;
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthSession());
}

export function requireAuth(): boolean {
  return isAuthenticated();
}