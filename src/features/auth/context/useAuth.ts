import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user } = context;

  const isAdmin = user?.rol === "ADMIN";

  const hasRole = (roles: string[]) => {
    if (!user?.rol) return false;
    return roles.includes(user.rol);
  };

  return {
    ...context,
    isAdmin,
    hasRole,
  };
};