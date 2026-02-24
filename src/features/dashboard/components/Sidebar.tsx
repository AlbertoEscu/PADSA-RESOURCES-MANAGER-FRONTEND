import React from "react";

const Sidebar: React.FC = () => {
  const buttons = [
    "Detalles Compañía",
    "Detalles Horas por Mes/Recurso",
    "Detalles Información de Pagos",
    "Detalles Tarifas por Recursos",
    "Generar Reportes",
  ];

  return (
    <div className="
  w-60
  h-full
  p-4
  flex
  flex-col
  gap-3
  bg-white/10
  backdrop-blur-lg
  border-r
  border-white/20
  shadow-lg
  shadow-blue-900/30
  rounded-2xl
">


      {buttons.map((btn, i) => (
        <button
          key={i}
          className="
  bg-blue-500/80
  text-white
  rounded-lg
  py-2
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

export default Sidebar;
