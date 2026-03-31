import { axiosInstance } from "../../../api/axiosInstance";

import type {
  HorasMesRecursoDto,
  SaveHorasMesRecursoDto,
} from "../types/horasMesRecurso.types";

export const horasMesRecursoService = {

  /**
   * =========================
   * OBTENER MES ACTUAL (REAL)
   * =========================
   */
  async getAll(): Promise<HorasMesRecursoDto[]> {
    const response = await axiosInstance.get("/recursos/mes-actual");

    // 🔥 Adaptador backend → frontend
    return response.data.map((item: any, index: number) => ({
      id: index + 1,
      idHoras: index + 1,

      numeroPersonal: item.numeroPersonal,
      nombrePersonal: item.nombrePersonal,

      anio: item.anio,
      mes: item.mes,

      horasSemana1: item.horasSemana1 ?? 0,
      horasSemana2: item.horasSemana2 ?? 0,
      horasSemana3: item.horasSemana3 ?? 0,
      horasSemana4: item.horasSemana4 ?? 0,
      horasSemana5: item.horasSemana5 ?? 0,

      horasVacaciones: item.horasVacaciones ?? 0,
      horasMes: item.horasMes ?? 0,

      usuarioModificacion: item.usuarioModificacion ?? "system",
      fechaUltimaModificacion: new Date().toISOString(),
    }));
  },

  /**
   * =========================
   * (OPCIONAL) GET BY ID
   * =========================
   */
  async getById(id: number): Promise<HorasMesRecursoDto | undefined> {
    console.warn("getById no implementado en backend");
    return undefined;
  },

  /**
   * =========================
   * (OPCIONAL) CREATE
   * =========================
   */
  async createHours(data: SaveHorasMesRecursoDto): Promise<void> {
    console.warn("createHours no implementado en backend");
  },

  /**
   * =========================
   * (OPCIONAL) UPDATE
   * =========================
   */
  async updateHours(
    id: number,
    data: Partial<HorasMesRecursoDto>,
  ): Promise<void> {
    console.warn("updateHours no implementado en backend");
  },

  /**
 * =========================
 * UPLOAD EXCEL (SINGLE)
 * =========================
 */
async uploadFile(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/recursos/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
},

/**
 * =========================
 * UPLOAD EXCEL (MULTIPLE)
 * =========================
 */
async uploadMultiple(files: File[]): Promise<any> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post("/recursos/upload-multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
},
};