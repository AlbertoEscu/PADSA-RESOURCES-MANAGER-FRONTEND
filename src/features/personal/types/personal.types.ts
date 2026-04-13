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

  // 🔥 NUEVO CAMPO
  perfil: string;

  fechaAlta: string;
  fechaBaja?: string;

  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

export interface PersonalProjectDto {
  id: number;

  numeroEmpleado: string;
  nombreCompleto: string;
  compania: string;
  perfil: string;

  idproyecto: number;
  idcliente: number;
  nombreProyecto: string;

  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

export interface EmpleadoCatalogoDto {
  idEmpleado: number;
  nombreCompleto: string;
  idPerfil?: number;
}

export interface Option {
  value: number;
  label: string;
  extra?: {
    idPerfil?: number;
  };
}

export interface ProyectoCatalogoDto {
  idProyecto: number;
  nombreProyecto: string;
}
