
// ✅ FORM (para create/edit)
export interface ProjectForm {
  idCliente: number;
  nombreProyecto: string;
  companiaAsignada: string;
  fechaInicio: string; // ISO yyyy-MM-dd
  fechaFinal?: string;
  idJira?: string;
  modalidad: string;
  director: string;
  solicitante: string;
  gerente: string;
  areaNegocio?: string;
  coe?: string;
  mesServicio: string;
  anioServicio: number;
  usuarioWindows?: string;
  vigenciaUsuario?: string;
  idConsultor?: string;
  pepCapex?: string;
  determinanteOpex?: string;
  numeroSow?: string;
  companiaPago?: string;
  horasEstimadas?: number;
}

export interface ProjectDto {
  idProyecto: number;
  idCliente: number;
  nombreProyecto: string;
  companiaAsignada: string;
  fechaInicio: string;
  fechaFinal?: string;
  idJira?: string;
  modalidad: string;
  director: string;
  solicitante: string;
  gerente: string;
  areaNegocio?: string;
  coe?: string;
  mesServicio: string;
  anioServicio: number;
  usuarioWindows?: string;
  vigenciaUsuario?: string;
  idConsultor?: string;
  pepCapex?: string;
  determinanteOpex?: string;
  numeroSow?: string;
  companiaPago?: string;
  horasEstimadas?: number;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
  estatus: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProjectForm {
  idCliente: number;
  nombreProyecto: string;
  companiaAsignada: string;
  fechaInicio: string; // ISO yyyy-MM-dd
  fechaFinal?: string;
  idJira?: string;
  modalidad: string;
  director: string;
  solicitante: string;
  gerente: string;
  areaNegocio?: string;
  coe?: string;
  mesServicio: string;
  anioServicio: number;
  usuarioWindows?: string;
  vigenciaUsuario?: string;
  idConsultor?: string;
  pepCapex?: string;
  determinanteOpex?: string;
  numeroSow?: string;
  companiaPago?: string;
  horasEstimadas?: number;
  usuarioModificacion: string; // obligatorio
}

export interface ProjectDto extends ProjectForm {
  idProyecto: number;
  fechaUltimaModificacion: string;
  estatus: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}