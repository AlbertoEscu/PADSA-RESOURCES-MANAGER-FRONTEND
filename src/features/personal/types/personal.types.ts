/**
 * ==========================================
 * BACKEND DTOs (NEW)
 * ==========================================
 */

export interface EmpleadoResponseDTO {
  id: number;
  clave: string;

  companiaId: number;
  companiaClave: string;

  perfilId?: number;
  perfilClave?: string;

  nombreCompleto: string;

  curp?: string;
  rfc?: string;

  telefono?: string;
  email?: string;
  direccion?: string;

  tipoRecurso?: "Administrativo" | "Tecnico";

  nss?: string;

  fechaAlta?: string;
  fechaBaja?: string;

  estatus: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface EmpleadoRequestDTO {
  clave: string;
  companiaId: number;
  perfilId?: number;
  nombreCompleto: string;

  curp?: string;
  rfc?: string;
  telefono?: string;
  email?: string;
  direccion?: string;

  tipoRecurso?: "Administrativo" | "Tecnico";
  nss?: string;

  fechaAlta?: string;
  fechaBaja?: string;
}

export interface PersonalDto {
  id: number;

  clave: string;

  companiaId: number;
  compania: string;

  perfilId?: number;
  perfil?: string;

  nombreCompleto: string;

  curp?: string;
  rfc?: string;

  telefono?: string;
  email?: string;
  direccion?: string;

  tipoRecurso?: string;
  nss?: string;

  fechaAlta?: string;
  fechaBaja?: string;

  estatus: string;

  createdAt: string;
  updatedAt: string;
}

const mapEmpleadoToPersonal = (emp: EmpleadoResponseDTO): PersonalDto => ({
  id: emp.id,
  clave: emp.clave,

  companiaId: emp.companiaId,
  compania: emp.companiaClave,

  perfilId: emp.perfilId,
  perfil: emp.perfilClave || "Sin perfil",

  nombreCompleto: emp.nombreCompleto,

  curp: emp.curp,
  rfc: emp.rfc,

  telefono: emp.telefono,
  email: emp.email,
  direccion: emp.direccion,

  tipoRecurso: emp.tipoRecurso,
  nss: emp.nss,

  fechaAlta: emp.fechaAlta,
  fechaBaja: emp.fechaBaja,

  estatus: emp.estatus,

  createdAt: emp.createdAt,
  updatedAt: emp.updatedAt,
});

export interface PerfilCatalogoDto {
  id: number;
  clave: string;
}

export interface CompaniaCatalogoDto {
  id: number;
  clave: string;
}
export interface Option {
  value: number;
  label: string;
}

export interface EmpleadoProyectoRequestDTO {
  clave: string;
  empleadoId: number;
  proyectoId: number;
}

export interface EmpleadoProyectoResponseDTO {
  id: number;
  clave: string;

  empleadoId: number;
  empleadoClave: string;

  proyectoId: number;
  proyectoClave: string;

  estatus: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}