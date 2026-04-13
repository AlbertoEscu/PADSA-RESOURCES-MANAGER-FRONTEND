import { axiosInstance } from "../../../api/axiosInstance";
import type { CompanyStatusDB } from "../types/companyDetails.types";

// 🔹 Request/Response backend
export interface CompaniaRequest {
  nombreCompania: string;
  rfc: string;
  direccionFiscal: string;
  usuarioModificacion: string;
  estatus: CompanyStatusDB;
}

export interface CompaniaResponse {
  idCompania: number;
  nombreCompania: string;
  rfc: string;
  direccionFiscal: string;
  estatus: CompanyStatusDB;
  fechaAlta: string; // 👈 NUEVO
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

interface PaginatedCompaniaResponse {
  content: CompaniaResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const companyDetailsService = {
  async getCompanies(page = 0, size = 5): Promise<PaginatedCompaniaResponse> {
    const { data } = await axiosInstance.get<PaginatedCompaniaResponse>("/companias", {
      params: { page, size },
    });
    return data;
  },

  async getCompanyById(id: string | number): Promise<CompaniaResponse> {
    const { data } = await axiosInstance.get<CompaniaResponse>(`/companias/${id}`);
    return data;
  },

  async createCompany(company: CompaniaRequest): Promise<CompaniaResponse> {
    const { data } = await axiosInstance.post<CompaniaResponse>("/companias", company);
    return data;
  },

  async updateCompany(id: string | number, company: CompaniaRequest): Promise<CompaniaResponse> {
    const { data } = await axiosInstance.put<CompaniaResponse>(`/companias/${id}`, company);
    return data;
  },

  async deleteCompany(id: string | number, usuarioModificacion: string): Promise<void> {
    await axiosInstance.delete(`/v1/companias/${id}`, {
      headers: { "X-Usuario-Modificacion": usuarioModificacion },
    });
  },
};