import { useAuth } from "../features/auth/context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function SessionExpiredModal() {

  const { sessionExpired, clearSessionExpired } = useAuth();

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    if (sessionExpired) {

      setVisible(true);

    }

  }, [sessionExpired]);

  const handleLogin = () => {

    setVisible(false);

    clearSessionExpired();

    navigate("/login");

  };

  if (!sessionExpired) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>

      {/* Modal */}
      <div
        className={`
          relative
          bg-padsa-surface
          border border-padsa-border
          rounded-2xl
          shadow-2xl
          p-8
          w-full max-w-md
          text-center
          transition-all
          duration-300
          ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >

        <div className="flex justify-center mb-4">

          <div className="bg-yellow-500/10 p-4 rounded-full">

            <AlertTriangle
              size={32}
              className="text-yellow-400"
            />

          </div>

        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Sesión expirada
        </h2>

        <p className="text-padsa-text-secondary mb-6">
          Tu sesión ha expirado por seguridad.
        </p>

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-padsa-primary
            hover:bg-padsa-primary-hover
            text-white
            py-2.5
            rounded-lg
            transition-all
            hover:scale-[1.02]
          "
        >
          Iniciar sesión nuevamente
        </button>

      </div>

    </div>

  );

}