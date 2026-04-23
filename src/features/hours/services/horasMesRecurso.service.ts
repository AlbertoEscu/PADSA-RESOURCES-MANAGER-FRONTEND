import { axiosInstance } from "../../../api/axiosInstance";

import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";

export const horasMesRecursoService = {
  /**
   * =========================
   * UPLOAD EXCEL (SINGLE)
   * =========================
   */
  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post("/horas-mes-recursos/upload", formData, {
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

    const response = await axiosInstance.post(
      "/horas-mes-recursos/upload-multiple",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  async findWithFilters(params: {
    empleadoId?: number;
    proyectoId?: number;
    fechaInicio?: string; // ISO: yyyy-MM-dd
    fechaFin?: string;
  }): Promise<HorasMesRecursoDto[]> {
    const queryParams = new URLSearchParams();

    if (params.empleadoId) {
      queryParams.append("empleadoId", params.empleadoId.toString());
    }

    if (params.proyectoId) {
      queryParams.append("proyectoId", params.proyectoId.toString());
    }

    if (params.fechaInicio) {
      queryParams.append("fechaInicio", params.fechaInicio);
    }

    if (params.fechaFin) {
      queryParams.append("fechaFin", params.fechaFin);
    }

    const response = await axiosInstance.get(
      `/horas-mes-recursos/filtrar?${queryParams.toString()}`,
    );

    // 🔥 Adaptador backend → frontend
    return response.data.map((item: any) => ({
      id: item.id,
      proveedor: item.proveedor,
      fecha: item.fecha,

      empleadoId: item.empleadoId,
      usuarioWindows: item.usuarioWindows,
      nombreProfesional: item.nombreProfesional,

      axityTribe: item.axityTribe,
      axitySquad: item.axitySquad,
      lead: item.lead,
      wm: item.wm,
      techLead: item.techLead,

      idJira: item.idJira,
      proyectoId: item.proyectoId,
      nombreProyecto: item.nombreProyecto,

      actividades: item.actividades,
      horas: item.horas ?? 0,
      entregables: item.entregables,
      comentarios: item.comentarios,

      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  },
};
