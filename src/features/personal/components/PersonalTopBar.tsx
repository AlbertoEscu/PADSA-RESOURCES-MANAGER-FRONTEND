import { useNavigate } from "react-router-dom";

const PersonalTopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Personal</h1>

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
        <button className="
            flex-1
            text-white
            px-4
            py-2
            rounded-xl
            bg-red-500
            transition
            duration-200
            ease-in-out
            transform
            hover:bg-blue-600
            hover:scale-105
            hover:shadow-lg
            hover:shadow-blue-900/40
            active:scale-95
          ">
          Nuevo Registro
        </button>

        <button className="
            flex-1
            text-white
            px-4
            py-2
            rounded-xl
            bg-blue-500/80
            transition
            duration-200
            ease-in-out
            transform
            hover:bg-blue-600
            hover:scale-105
            hover:shadow-lg
            hover:shadow-blue-900/40
            active:scale-95
          ">
          Catálogo Personal
        </button>

        <button className="
            flex-1
            text-white
            px-4
            py-2
            rounded-xl
            bg-blue-500/80
            transition
            duration-200
            ease-in-out
            transform
            hover:bg-blue-600
            hover:scale-105
            hover:shadow-lg
            hover:shadow-blue-900/40
            active:scale-95
          ">
          Catálogo Clientes
        </button>
      </div>
    </div>
  );
};

export default PersonalTopBar;
