import { axiosInstance } from "../../../api/axiosInstance";

import type {
  PersonalDto,
  PersonalProjectDto,
} from "../types/personal.types";

/**
 * ==========================================
 * TYPES BACKEND
 * ==========================================
 */
interface EmpleadoResponse {
  idEmpleado: number;
  idCompania: number;
  nombreCompania: string;
  nombreCompleto: string;
  curp: string;
  rfc: string;
  telefono: number;
  email: string;
  direccion: string;
  tipoRecurso: boolean;
  nss: number;
  estatus: string;

  // 🔥 NUEVO
  perfil?: {
    idPerfil: number;
    nombrePerfil: string;
  };

  fechaAlta: string;
  fechaBaja?: string;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}

interface PersonalProjectResponse {
  numeroEmpleado: number;
  nombreCompleto: string;
  compania: string;
  perfil: string;

  idProyecto: number;
  idCliente: number;
  nombreProyecto: string;

  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

const handleRequest = async <T>(promise: Promise<any>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    console.error("🔥 API ERROR:", error);
    throw error;
  }
};

const mapEmpleadoToPersonal = (emp: EmpleadoResponse): PersonalDto => ({
  id: emp.idEmpleado,
  numeroPersonal: String(emp.idEmpleado),
  compania: emp.nombreCompania,
  nombreCompleto: emp.nombreCompleto,
  curp: emp.curp,
  rfc: emp.rfc,
  telefono: String(emp.telefono),
  email: emp.email,
  direccion: emp.direccion,
  esquema: "N/A",
  tipoRecurso: emp.tipoRecurso ? "Interno" : "Externo",
  nss: String(emp.nss),
  estatus: emp.estatus,

  // 🔥 AQUI VIENE LO NUEVO
  perfil: emp.perfil?.nombrePerfil || "Sin perfil",

  fechaAlta: emp.fechaAlta,
  fechaBaja: emp.fechaBaja,
  fechaUltimaModificacion: emp.fechaUltimaModificacion,
  usuarioModificacion: emp.usuarioModificacion,
});

const mapPersonalProject = (item: PersonalProjectResponse): PersonalProjectDto => ({
  id: item.numeroEmpleado,
  numeroEmpleado: String(item.numeroEmpleado),
  nombreCompleto: item.nombreCompleto,
  compania: item.compania,
  perfil: item.perfil || "Sin perfil",

  idproyecto: item.idProyecto,
  idcliente: item.idCliente,
  nombreProyecto: item.nombreProyecto,

  fechaUltimaModificacion: item.fechaUltimaModificacion,
  usuarioModificacion: item.usuarioModificacion,
});

/**
 * ==========================================
 * SERVICE
 * ==========================================
 */
export const personalService = {
  /**
   * ==========================================
   * 👤 EMPLEADOS
   * ==========================================
   */
  async getPersonal(): Promise<PersonalDto[]> {
    const data = await handleRequest<PageResponse<EmpleadoResponse>>(
      axiosInstance.get("/empleados"),
    );
    return data.content.map(mapEmpleadoToPersonal);
  },

  async getById(id: string | number) {
    const data = await handleRequest<EmpleadoResponse>(
      axiosInstance.get(`/empleados/${id}`),
    );

    return {
  ...mapEmpleadoToPersonal(data),
  perfil: data.perfil, // 🔥 importante para el form
};
  },

  async create(payload: any) {
    return handleRequest(axiosInstance.post("/empleados", payload));
  },

  async update(id: string | number, payload: any) {
    return handleRequest(axiosInstance.put(`/empleados/${id}`, payload));
  },

  async getPersonalProjects(): Promise<PersonalProjectDto[]> {
  const data = await handleRequest<PersonalProjectResponse[]>(
    axiosInstance.get("/asignaciones/empleados-con-proyectos"),
  );

  return data.map(mapPersonalProject);
},

  /**
   * ==========================================
   * 🧠 PROFILES
   * ==========================================
   */

  async getPerfiles() {
    const data = await handleRequest<PageResponse<any>>(
      axiosInstance.get("/perfiles", {
        params: { page: 0, size: 100 },
      }),
    );

    return data.content.map((item: any) => ({
      id: item.idPerfil,
      nombre: item.nombrePerfil,
    }));
  },

  /**
   * ==========================================
   * 🧾 FORM
   * ==========================================
   */
  mapToFormData(personal: PersonalDto) {
    return {
      numeroEmpleado: personal.numeroPersonal,
      compania: personal.compania,
      nombreCompleto: personal.nombreCompleto,
      curp: personal.curp,
      rfc: personal.rfc,
      telefono: personal.telefono,
      email: personal.email,
      direccion: personal.direccion,
      esquema: personal.esquema,
      tipoRecurso: personal.tipoRecurso,
      nss: personal.nss,
      fechaAlta: personal.fechaAlta,
      estatus: personal.estatus,
    };
  },
};
