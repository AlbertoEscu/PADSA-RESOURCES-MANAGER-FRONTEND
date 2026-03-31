export const isDatosValid = (data: any) => {
  return data?.numeroEmpleado && data?.nombreCompleto && data?.empresa;
};

export const isPerfilValid = (data: any) => {
  return data?.perfil?.length > 0;
};

type Skills = Record<string, string[]>;
export const isSkillsValid = (data: any) => {
  const skills = data?.skills as Skills;

  return skills && Object.values(skills).some((arr) => arr.length > 0);
};
