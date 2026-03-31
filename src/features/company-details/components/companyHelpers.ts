import type { CompanyStatus, CompanyStatusDB } from "../types/companyDetails.types";

// 🔹 DB -> UI
export const normalizeStatusFromDB = (estatus: CompanyStatusDB): CompanyStatus =>
  estatus === "A" ? "Activo" : "Inactivo";

// 🔹 UI -> DB
export const normalizeStatusToDB = (estatus: CompanyStatus): CompanyStatusDB =>
  estatus === "Activo" ? "A" : "I";