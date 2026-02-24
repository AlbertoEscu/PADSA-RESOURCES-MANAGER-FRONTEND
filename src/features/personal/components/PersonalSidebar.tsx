const PersonalSidebar = () => {
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
            <button className="
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
">
                Datos Generales
            </button>

            <button className="
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
">
                Perfil / Habilidades
            </button>

            <button className="
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
">
                Proyecto
            </button>
        </div>
    );
};

export default PersonalSidebar;
