export interface PerfilRequestDTO {
  clave: string;
  nombre: string;
  descripcion?: string;
}

export interface PerfilResponseDTO {
  id: number;
  clave: string;
  nombre: string;
  descripcion?: string;

  estatus: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

/**
 * UI model (para tablas)
 */
export interface PerfilDto {
  id: number;
  clave: string;
  nombre: string;
  descripcion?: string;
  estatus: string;
  updatedAt: string;
}