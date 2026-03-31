import { createContext, useState, useEffect, type ReactNode } from "react";

import { setupInterceptors } from "../../../api/setupInterceptors";

import { parseJwt, isTokenExpired } from "../../../shared/utils/jwt";

export interface User {
  username: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  sessionExpired: boolean;
  clearSessionExpired: () => void;

  login: (token: string, username?: string) => void;
  logout: (expired?: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

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

  // RESTORE SESSION
  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    const storedUsername = localStorage.getItem("username");

    if (storedToken && !isTokenExpired(storedToken)) {

      setToken(storedToken);

      setUser({
        username: storedUsername || parseJwt(storedToken)?.sub || "",
      });

      scheduleAutoLogout(storedToken);

    } else {

      logout(false);

    }

    setupInterceptors(logout);

    setLoading(false);

  }, []);

  // LOGIN
  const login = (jwtToken: string, username?: string) => {

    localStorage.setItem("token", jwtToken);

    if (username)
      localStorage.setItem("username", username);

    setToken(jwtToken);

    setUser({
      username: username || parseJwt(jwtToken)?.sub || "",
    });

    setSessionExpired(false);

    scheduleAutoLogout(jwtToken);

  };

  // LOGOUT
  const logout = (expired = false) => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    setToken(null);

    setUser(null);

    if (expired) {

      setSessionExpired(true);

    }

    if (logoutTimer) {

      clearTimeout(logoutTimer);

    }

  };

  // CLEAR MODAL STATE
  const clearSessionExpired = () => {

    setSessionExpired(false);

  };

  // AUTO LOGOUT WHEN TOKEN EXPIRES
  function scheduleAutoLogout(token: string) {

    const payload = parseJwt(token);

    if (!payload) return;

    const expiresIn = payload.exp * 1000 - Date.now();

    if (expiresIn <= 0) {

      logout(true);

      return;

    }

    logoutTimer = window.setTimeout(
      () => logout(true),
      expiresIn
    );

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
        clearSessionExpired
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};