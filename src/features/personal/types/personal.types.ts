export interface PersonalDto {
  id: number;

  numeroPersonal: string;
  compania: string;
  nombreCompleto: string;

  curp: string;
  rfc: string;

  telefono: string;
  email: string;
  direccion: string;

  esquema: string;
  tipoRecurso: string;

  nss: string;
  estatus: string;

  fechaAlta: string;
  fechaBaja?: string;

  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

export interface PersonalProfileDto {
  id: number; // 🔥 AGREGAR
  idPerfil: number;
  idEmpleado: number;

  numeroEmpleado: string;
  nombreCompleto: string;

  perfil: string;
  nivel: string;
  estatus: string;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

export interface PersonalSkillsDto {
  id: number; // 🔥 AGREGAR
  idSkill: number;
  idEmpleado: number;

  numeroEmpleado: string;
  nombreCompleto: string;

  lenguajesProgramacion: string;
  basesDatos: string;
  frameworks: string;
  cursos: string;
  certificaciones: string;
  estatus: string;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}