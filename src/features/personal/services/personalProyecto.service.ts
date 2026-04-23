import { axiosInstance } from "../../../api/axiosInstance";
import type {
  EmpleadoProyectoRequestDTO,
  EmpleadoProyectoResponseDTO,
} from "../types/personal.types";

const handleRequest = async <T>(promise: Promise<any>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    console.error("🔥 API ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 MAP RESPONSE (opcional pero recomendado)
 */
const mapEmpleadoProyecto = (
  data: EmpleadoProyectoResponseDTO
): EmpleadoProyectoResponseDTO => ({
  ...data,
});

export const empleadoProyectoService = {
  async getAll(): Promise<EmpleadoProyectoResponseDTO[]> {
    const data = await handleRequest<EmpleadoProyectoResponseDTO[]>(
      axiosInstance.get("/empleado-proyectos")
    );

    return data.map(mapEmpleadoProyecto);
  },

  async getById(id: number): Promise<EmpleadoProyectoResponseDTO> {
    const data = await handleRequest<EmpleadoProyectoResponseDTO>(
      axiosInstance.get(`/empleado-proyectos/${id}`)
    );

    return mapEmpleadoProyecto(data);
  },

  async create(
    payload: EmpleadoProyectoRequestDTO
  ): Promise<EmpleadoProyectoResponseDTO> {
    const data = await handleRequest<EmpleadoProyectoResponseDTO>(
      axiosInstance.post("/empleado-proyectos", payload)
    );

    return mapEmpleadoProyecto(data);
  },

  async update(
    id: number,
    payload: EmpleadoProyectoRequestDTO
  ): Promise<EmpleadoProyectoResponseDTO> {
    const data = await handleRequest<EmpleadoProyectoResponseDTO>(
      axiosInstance.put(`/empleado-proyectos/${id}`, payload)
    );

    return mapEmpleadoProyecto(data);
  },

  async delete(id: number): Promise<void> {
    await handleRequest(
      axiosInstance.delete(`/empleado-proyectos/${id}`)
    );
  },
};