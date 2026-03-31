import { axiosInstance } from "../../../api/axiosInstance";

import type {
  PersonalDto,
  PersonalProfileDto,
  PersonalSkillsDto,
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

interface EmpleadoProfileResponse {
  idPerfil: number;
  idEmpleado: number;
  nombreEmpleado: string;
  perfil: string;
  nivel: string;
  estatus: string;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

interface EmpleadoSkillsResponse {
  idSkill: number;
  idEmpleado: number;
  nombreEmpleado: string;
  lenguajesProgramacion: string;
  basesDatos: string;
  frameworks: string;
  cursos: string;
  certificaciones: string;
  estatus: string;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}

/**
 * ==========================================
 * MAPPERS
 * ==========================================
 */
const mapProfile = (p: EmpleadoProfileResponse): PersonalProfileDto => ({
  id: p.idPerfil,
  idPerfil: p.idPerfil,
  idEmpleado: p.idEmpleado,
  numeroEmpleado: String(p.idEmpleado),
  nombreCompleto: p.nombreEmpleado,
  perfil: p.perfil,
  nivel: p.nivel,
  estatus: p.estatus,
  fechaUltimaModificacion: p.fechaUltimaModificacion,
  usuarioModificacion: p.usuarioModificacion,
});

const mapSkill = (s: EmpleadoSkillsResponse): PersonalSkillsDto => ({
  id: s.idSkill,
  idSkill: s.idSkill,
  idEmpleado: s.idEmpleado,
  numeroEmpleado: String(s.idEmpleado),
  nombreCompleto: s.nombreEmpleado,
  lenguajesProgramacion: s.lenguajesProgramacion,
  basesDatos: s.basesDatos,
  frameworks: s.frameworks,
  cursos: s.cursos,
  certificaciones: s.certificaciones,
  estatus: s.estatus,
  fechaUltimaModificacion: s.fechaUltimaModificacion,
  usuarioModificacion: s.usuarioModificacion,
});

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
  fechaAlta: emp.fechaAlta,
  fechaBaja: emp.fechaBaja,
  fechaUltimaModificacion: emp.fechaUltimaModificacion,
  usuarioModificacion: emp.usuarioModificacion,
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
      perfiles: [],
      skills: {},
      proyecto: {},
    };
  },

  async create(payload: any) {
    return handleRequest(axiosInstance.post("/empleados", payload));
  },

  async update(id: string | number, payload: any) {
    return handleRequest(axiosInstance.put(`/empleados/${id}`, payload));
  },

  /**
   * ==========================================
   * 🧠 PROFILES
   * ==========================================
   */
  async getProfilesByEmpleadoId(idEmpleado: number) {
    const data = await handleRequest<EmpleadoProfileResponse[]>(
      axiosInstance.get(`/empleados/${idEmpleado}/profile`),
    );
    return data.map(mapProfile);
  },
  async getProfiles(page = 0, size = 50): Promise<PersonalProfileDto[]> {
    const data = await handleRequest<PageResponse<EmpleadoProfileResponse>>(
      axiosInstance.get("/empleados/profile", { params: { page, size } }),
    );
    return data.content.map(mapProfile);
  },

  async createProfile(payload: {
    idEmpleado: number;
    perfil: string;
    nivel: string;
    usuarioModificacion: string;
  }) {
    return handleRequest<EmpleadoProfileResponse>(
      axiosInstance.post("/empleados/profile", payload),
    );
  },

  async updateProfile(
    idPerfil: number,
    payload: {
      idEmpleado: number;
      perfil: string;
      nivel: string;
      usuarioModificacion: string;
    },
  ) {
    return handleRequest<EmpleadoProfileResponse>(
      axiosInstance.put(`/empleados/profile/${idPerfil}`, payload),
    );
  },

  /**
   * ==========================================
   * 🛠️ SKILLS
   * ==========================================
   */
  async getSkills(page = 0, size = 50) {
    const data = await handleRequest<PageResponse<EmpleadoSkillsResponse>>(
      axiosInstance.get("/empleados/skills", {
        params: { page, size },
      }),
    );
    return data.content.map(mapSkill);
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
