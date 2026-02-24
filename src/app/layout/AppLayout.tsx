import { Outlet } from "react-router-dom";

/**
 * Layout global.
 * Contiene el fondo que se reutiliza en TODA la aplicación.
 */
export const AppLayout: React.FC = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_center,_#1e3a8a,_#0b1f3a,_#050a16)]
      "
    >
      <Outlet />
    </div>
  );
};
