import { createContext } from "react";
import type { User } from "../types/auth.types";

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
