import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth.types";
import { setupInterceptors } from "../../../app/api/setupInterceptors";
import { loginRequest } from "../services/auth.service";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setIsInitializing(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginRequest({ username, password });

      localStorage.setItem("token", response.token);

      const userData: User = {
        id: 1,
        username: response.username,
        name: response.username,
        role: "ADMIN",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, isInitializing }}
    >
      {children}
    </AuthContext.Provider>
  );
};
