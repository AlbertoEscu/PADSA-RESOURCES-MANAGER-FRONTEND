import { useNavigate } from "react-router-dom";
import TopNavButton from "../../../app/layout/TopNavButton";

const PersonalTopBar = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold text-white">
          Personal
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition"
        >
          Inicio
        </button>

      </div>

      {/* Botones superiores */}
      <div
        className="
          flex
          gap-4
          mb-6
          p-3
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-2xl
          shadow-md
          shadow-blue-900/20
        "
      >

        <TopNavButton to="/personal/nuevo">
          Nuevo Registro
        </TopNavButton>

        <TopNavButton to="/personal/catalogo">
          Catálogo Personal
        </TopNavButton>

        <TopNavButton to="/clientes/catalogo">
          Catálogo Clientes
        </TopNavButton>

      </div>

    </div>
  );
};

export default PersonalTopBar;