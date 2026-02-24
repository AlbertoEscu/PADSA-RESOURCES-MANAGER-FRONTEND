import React from "react";
import { useNavigate } from "react-router-dom";

const buttons = ["Catalogo Personal", "Catalogo Clientes", "Catalogo Proyectos"];

const TopButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (btn: string) => {
    if (btn === "Catalogo Personal") {
      navigate("/personal");
    }
    if (btn === "Catalogo Clientes") {
      navigate("/clientes"); // cuando lo crees
    }
    if (btn === "Catalogo Proyectos") {
      navigate("/proyectos"); // cuando lo crees
    }
  };

  return (
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
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={() => handleClick(btn)}
          className="
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
          "
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
