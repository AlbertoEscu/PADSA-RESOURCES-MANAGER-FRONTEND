import { axiosInstance } from "../../../api/axiosInstance";
import type {
  PerfilRequestDTO,
  PerfilResponseDTO,
  PerfilDto,
} from "../types/perfil.types";

const handleRequest = async <T>(promise: Promise<any>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error("🔥 PERFIL API ERROR:", error);
    throw error;
  }
};

const mapPerfil = (p: PerfilResponseDTO): PerfilDto => ({
  id: p.id,
  clave: p.clave,
  nombre: p.nombre,
  descripcion: p.descripcion,
  estatus: p.estatus,
  updatedAt: p.updatedAt,
});

export const perfilService = {
  async getAll(): Promise<PerfilDto[]> {
    const data = await handleRequest<PerfilResponseDTO[]>(
      axiosInstance.get("/perfiles")
    );

    return data.map(mapPerfil);
  },

  async getById(id: number): Promise<PerfilDto> {
    const data = await handleRequest<PerfilResponseDTO>(
      axiosInstance.get(`/perfiles/${id}`)
    );

    return mapPerfil(data);
  },

  async create(payload: PerfilRequestDTO): Promise<PerfilDto> {
    const data = await handleRequest<PerfilResponseDTO>(
      axiosInstance.post("/perfiles", payload)
    );

    return mapPerfil(data);
  },

  async update(id: number, payload: PerfilRequestDTO): Promise<PerfilDto> {
    const data = await handleRequest<PerfilResponseDTO>(
      axiosInstance.put(`/perfiles/${id}`, payload)
    );

    return mapPerfil(data);
  },

  async delete(id: number): Promise<void> {
    await handleRequest(
      axiosInstance.delete(`/perfiles/${id}`)
    );
  },
};