import { axiosInstance } from "../../../api/axiosInstance";

// 🔹 Request backend (ALINEADO)
export interface CompaniaRequest {
  clave: string;
  nombre: string;
  rfc?: string;
  direccionFiscal?: string;
}

// 🔹 Response backend (ALINEADO)
export interface CompaniaResponse {
  id: number;
  clave: string;
  nombre: string;
  rfc?: string;
  direccionFiscal?: string;
  estatus: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export const companyDetailsService = {

  async getCompanies(): Promise<CompaniaResponse[]> {
    const { data } = await axiosInstance.get<CompaniaResponse[]>("/companias");
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

  async deleteCompany(id: string | number): Promise<void> {
    await axiosInstance.delete(`/companias/${id}`);
  },

};