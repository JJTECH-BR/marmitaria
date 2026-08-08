import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getAuthSession,
  isAuthenticated,
  login as loginService,
  logout as logoutService,
  setAdminPin,
  getAdminPin,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState(getAdminPin());
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const login = useCallback((value) => {
    const result = loginService(value);
    if (!result.authenticated) {
      setError(result.error || "PIN inválido.");
      setAuthenticated(false);
      return false;
    }

    setError("");
    setAuthenticated(true);
    setPin(getAdminPin());
    return true;
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setAuthenticated(false);
    setError("");
  }, []);

  const savePin = useCallback((value) => {
    const nextPin = setAdminPin(value);
    setPin(nextPin);
    return nextPin;
  }, []);

  const session = useMemo(() => getAuthSession(), [authenticated]);

  const value = useMemo(
    () => ({
      authenticated,
      session,
      pin,
      error,
      login,
      logout,
      savePin,
    }),
    [authenticated, session, pin, error, login, logout, savePin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
