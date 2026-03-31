import { axiosInstance } from "../../../../src/api/axiosInstance";
import type { TarifaRecursoDto } from "../types/tarifaRecurso.types";

const BASE_URL = "/tarifas";

export const tarifaRecursoService = {
  // 🔎 Obtener todas las tarifas con paginación y filtros
  async getAll(
    page = 0,
    size = 10,
    search?: string,
    filters?: Partial<Record<keyof TarifaRecursoDto, string>>
  ): Promise<{ content: TarifaRecursoDto[]; totalElements: number }> {
    const params: any = { page, size };

    if (search) params.search = search;

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
    }

    const response = await axiosInstance.get<{ content: TarifaRecursoDto[]; totalElements: number }>(
      BASE_URL,
      { params }
    );

    return response.data;
  },

  async getById(id: number): Promise<TarifaRecursoDto> {
    const response = await axiosInstance.get<TarifaRecursoDto>(`${BASE_URL}/${id}`);
    return response.data;
  },

  async create(data: Partial<TarifaRecursoDto>): Promise<TarifaRecursoDto> {
    const response = await axiosInstance.post<TarifaRecursoDto>(BASE_URL, data);
    return response.data;
  },

  async update(id: number, data: Partial<TarifaRecursoDto>): Promise<TarifaRecursoDto> {
    const response = await axiosInstance.put<TarifaRecursoDto>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${BASE_URL}/${id}`);
  },
};