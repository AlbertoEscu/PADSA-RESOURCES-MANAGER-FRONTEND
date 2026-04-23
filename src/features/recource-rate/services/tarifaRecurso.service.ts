import { axiosInstance } from "../../../api/axiosInstance";
import type { TarifaRequest, TarifaResponse } from "../types/tarifaRecurso.types";

const BASE_URL = "/tarifas";

export const tarifaService = {
  
  async getAll(): Promise<TarifaResponse[]> {
    const response = await axiosInstance.get<TarifaResponse[]>(BASE_URL);
    return response.data;
  },

  async getById(id: number): Promise<TarifaResponse> {
    const response = await axiosInstance.get<TarifaResponse>(`${BASE_URL}/${id}`);
    return response.data;
  },

  async create(data: TarifaRequest): Promise<TarifaResponse> {
    const response = await axiosInstance.post<TarifaResponse>(BASE_URL, data);
    return response.data;
  },

  async update(id: number, data: TarifaRequest): Promise<TarifaResponse> {
    const response = await axiosInstance.put<TarifaResponse>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`${BASE_URL}/${id}`);
  },
};