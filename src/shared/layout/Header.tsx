import { LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../features/auth/context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {

  const { user, logout } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);


  const getTitle = () => {

    if (location.pathname.includes("dashboard")) return "Dashboard";

    if (location.pathname.includes("personal")) return "Personal";

    if (location.pathname.includes("clients")) return "Clientes";

    if (location.pathname.includes("projects")) return "Proyectos";

    return "PADSA";

  };


  const getInitials = () => {

    if (!user?.username) return "?";

    return user.username.charAt(0).toUpperCase();

  };


  return (

    <header
      className="
        h-16
        bg-padsa-surface/80
        backdrop-blur-xl
        border-b border-padsa-border
        flex items-center justify-between
        px-6
        shadow-sm
      "
    >

      {/* TITLE */}
      <h1 className="text-padsa-text-primary font-semibold text-lg">
        {getTitle()}
      </h1>


      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* ✅ CATALOG BUTTONS (FUERA DEL BUTTON PRINCIPAL) */}
        <div className="hidden md:flex items-center gap-2">

          <button
            onClick={() => navigate("/personal")}
            className="
              px-3 py-1.5
              text-sm
              text-padsa-text-secondary
              hover:text-white
              hover:bg-padsa-surface-light
              rounded-lg
              transition
            "
          >
            Personal
          </button>

          <button
            onClick={() => navigate("/clients")}
            className="
              px-3 py-1.5
              text-sm
              text-padsa-text-secondary
              hover:text-white
              hover:bg-padsa-surface-light
              rounded-lg
              transition
            "
          >
            Clientes
          </button>

          <button
            onClick={() => navigate("/projects")}
            className="
              px-3 py-1.5
              text-sm
              text-padsa-text-secondary
              hover:text-white
              hover:bg-padsa-surface-light
              rounded-lg
              transition
            "
          >
            Proyectos
          </button>

        </div>


        {/* AVATAR DROPDOWN */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-3
              hover:bg-padsa-surface-light
              px-3 py-2
              rounded-lg
              transition-all duration-200
            "
          >

            {/* avatar */}
            <div
              className="
                w-9 h-9
                bg-gradient-to-br from-padsa-primary to-blue-600
                rounded-full
                flex items-center justify-center
                text-white font-semibold
                shadow-md
              "
            >
              {getInitials()}
            </div>

            <ChevronDown
              size={16}
              className={`
                text-padsa-text-secondary
                transition-transform duration-200
                ${open ? "rotate-180" : ""}
              `}
            />

          </button>


          {/* DROPDOWN */}
          {open && (

            <div
              className="
                absolute right-0 mt-2
                w-48
                bg-padsa-surface
                border border-padsa-border
                rounded-xl
                shadow-lg
                overflow-hidden
                z-50
              "
            >

              <div className="px-4 py-3 border-b border-padsa-border">

                <p className="text-sm text-padsa-text-primary font-medium">
                  {user?.username}
                </p>

                <p className="text-xs text-padsa-text-secondary">
                  Usuario autenticado
                </p>

              </div>


              <button
                onClick={() => logout(false)}
                className="
                  w-full
                  flex items-center gap-2
                  px-4 py-3
                  text-sm
                  text-red-400
                  hover:bg-red-500/10
                  transition
                "
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

};