// 🔹 Status que usa el frontend: solo "Activo" o "Inactivo"
export type CompanyStatus = "Activo" | "Inactivo";

// 🔹 Status que usa el backend: "A" = Activo, "I" = Inactivo
export type CompanyStatusDB = "A" | "I";

export interface CompanyDto {
  idCompania: number;
  nombreCompania: string;
  rfc: string;
  direccionFiscal: string;
  estatus: CompanyStatus; // UI
  fechaAlta: string; // 👈 NUEVO
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

export interface CompanyDtoDB {
  idCompania: number;
  nombreCompania: string;
  rfc: string;
  direccionFiscal: string;
  estatus: CompanyStatusDB; // DB
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}