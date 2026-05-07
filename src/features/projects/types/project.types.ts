// ✅ FORM (create / update)
export interface ProjectForm {
  clave: string;
  clienteId: number;
  nombre: string;
  fechaInicio?: string; // yyyy-MM-dd
  fechaFin?: string;
  jiraId?: string;
  modalidad?: string;
  director?: string;
  gerente?: string;
  areaNegocio?: string;
  horasEstimadas?: number;
  estatus: string;
}

// ✅ DTO (response del backend)
export interface ProjectDto {
  id: number;
  clave: string;
  clienteId: number;
  clienteClave: string;
  nombre: string;
  fechaInicio?: string;
  fechaFin?: string;
  jiraId?: string;
  modalidad?: string;
  director?: string;
  gerente?: string;
  areaNegocio?: string;
  horasEstimadas?: number;
  estatus: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// ❗ Tu backend NO está paginando
export type ProjectListResponse = ProjectDto[];