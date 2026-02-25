import FeatureNavButton from "../../../app/layout/FeatureNavButtonProps";

const PersonalSidebar = () => {
  return (
    <div
      className="
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
"
    >
      <FeatureNavButton to="/personal/datos">Datos Generales</FeatureNavButton>
      <FeatureNavButton to="/personal/perfil">
        Perfil / Habilidades
      </FeatureNavButton>

      <FeatureNavButton to="/personal/proyecto">Proyecto</FeatureNavButton>
    </div>
  );
};

export default PersonalSidebar;
