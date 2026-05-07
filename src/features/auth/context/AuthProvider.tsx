import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { setupInterceptors } from "../../../api/setupInterceptors";
import { parseJwt, isTokenExpired } from "../../../shared/utils/jwt";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  const isAuthenticated = !!token;

  let logoutTimer: number | undefined;

  // 🔹 RESTORE SESSION
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedNombre = localStorage.getItem("nombre");
    const storedRol = localStorage.getItem("rol");

    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);

      setUser({
        nombre: storedNombre || "",
        rol: storedRol || "",
        username: parseJwt(storedToken)?.sub || "",
      });

      scheduleAutoLogout(storedToken);
    } else {
  setToken(null);
  setUser(null);
}

    setupInterceptors(logout);

    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = (jwtToken: string, nombre?: string, rol?: string) => {
    localStorage.setItem("token", jwtToken);

    if (nombre) localStorage.setItem("nombre", nombre);
    if (rol) localStorage.setItem("rol", rol);

    setToken(jwtToken);

    setUser({
      nombre: nombre || "",
      rol: rol || "",
      username: parseJwt(jwtToken)?.sub || "",
    });

    setSessionExpired(false);

    scheduleAutoLogout(jwtToken);
  };

  // 🔹 LOGOUT
const logout = (expired = false) => {
  localStorage.removeItem("token");
  localStorage.removeItem("nombre");
  localStorage.removeItem("rol");

  setToken(null);
  setUser(null);

  if (expired) setSessionExpired(true);

  if (logoutTimer) clearTimeout(logoutTimer);

  // 👇 usa navigate en vez de reload duro (opcional mejor)
  window.location.replace("/login");
};

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  // 🔹 AUTO LOGOUT
  function scheduleAutoLogout(token: string) {
    const payload = parseJwt(token);
    if (!payload) return;

    const expiresIn = payload.exp * 1000 - Date.now();

    if (expiresIn <= 0) {
      logout(true);
      return;
    }

    logoutTimer = window.setTimeout(() => logout(true), expiresIn);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading,
        sessionExpired,
        clearSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
