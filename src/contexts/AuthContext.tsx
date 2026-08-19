import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getAuthSession,
  login as loginService,
  logout as logoutService,
  setAdminPin,
  getAdminPin,
} from "../services/authService";

interface AuthSession {
  authenticated: boolean;
  loginAt: string;
  expiresAt: string;
}

interface LoginResult {
  authenticated: boolean;
  error?: string;
}

interface AuthContextValue {
  ready: boolean;
  authenticated: boolean;
  session: AuthSession | null;
  pin: string;
  error: string;
  login: (value: string) => boolean;
  logout: () => void;
  savePin: (value: string) => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [pin, setPin] = useState(getAdminPin());
  const [error, setError] = useState("");

  useEffect(() => {
    const currentSession = getAuthSession() as AuthSession | null;
    setSession(currentSession);
    setAuthenticated(Boolean(currentSession));
    setPin(getAdminPin());
    setReady(true);
  }, []);

  const login = useCallback((value: string) => {
    const result = loginService(value) as LoginResult;
    if (!result.authenticated) {
      setError(result.error || "PIN inválido.");
      setAuthenticated(false);
      setSession(null);
      return false;
    }

    setError("");
    setAuthenticated(true);
    setSession(result as AuthSession);
    setPin(getAdminPin());
    setReady(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setAuthenticated(false);
    setSession(null);
    setReady(true);
    setError("");
  }, []);

  const savePin = useCallback((value: string) => {
    const nextPin = setAdminPin(value);
    setPin(nextPin);
    return nextPin;
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      session,
      pin,
      error,
      login,
      logout,
      savePin,
    }),
    [ready, authenticated, session, pin, error, login, logout, savePin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
