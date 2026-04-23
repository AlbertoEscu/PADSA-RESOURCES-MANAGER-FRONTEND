import { createContext } from "react";

export interface User {
  username: string;
  rol: string;
  nombre: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  sessionExpired: boolean;
  clearSessionExpired: () => void;

  login: (token: string, nombre?: string, rol?: string) => void;
  logout: (expired?: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);