import { useAuth } from "../../features/auth/context/useAuth";

/**
 * Header superior.
 * Muestra usuario y botón logout.
 */
export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="
  h-16
  flex
  items-center
  justify-between
  px-5
  bg-white/10
  backdrop-blur-lg
  border-b
  border-white/20
  shadow-md
  shadow-blue-900/20
  text-white
">


      <div>Sistema de Gestion de Recursos</div>

      <button onClick={logout}>Cerrar sesión</button>
    </header>
  );
};
