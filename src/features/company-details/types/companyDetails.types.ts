// 🔹 Backend (API REAL)
export type CompanyStatusDB = "A" | "I" | "P";

export interface CompanyApi {
  id: number;
  clave: string;
  nombre: string;
  rfc: string;
  direccionFiscal: string;
  estatus: CompanyStatusDB;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

// 🔹 UI (Frontend limpio)
export type CompanyStatus = "Activo" | "Inactivo";

export interface CompanyDto {
  id: number;
  clave: string;
  nombre: string;
  rfc?: string; // 👈 FIX
  direccionFiscal?: string; // 👈 FIX
  estatus: string;
  createdAt: string;
  updatedAt: string;
}

export const mapCompanyApiToDto = (api: CompanyApi): CompanyDto => ({
  id: api.id,
  clave: api.clave,
  nombre: api.nombre,
  rfc: api.rfc,
  direccionFiscal: api.direccionFiscal,
  estatus: api.estatus === "A" ? "Activo" : "Inactivo",
  createdAt: api.createdAt,
  updatedAt: api.updatedAt,
});