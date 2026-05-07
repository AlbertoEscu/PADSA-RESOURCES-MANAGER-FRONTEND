import { axiosInstance } from "../../../api/axiosInstance";
import type {
  CompaniaCatalogoDto,
  EmpleadoRequestDTO,
  EmpleadoResponseDTO,
  Option,
  PerfilCatalogoDto,
  PersonalDto,
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
 * 🔥 NORMALIZA tipoRecurso AQUÍ (CLAVE DEL FIX)
 */
const normalizeTipoRecurso = (
  value: any
): "Administrativo" | "Tecnico" | undefined => {
  if (value === "true" || value === true) return "Tecnico";
  if (value === "false" || value === false) return "Administrativo";

  if (value === "Tecnico" || value === "Administrativo") return value;

  return undefined;
};

const mapEmpleadoToPersonal = (emp: EmpleadoResponseDTO): PersonalDto => ({
  id: emp.id,
  clave: emp.clave,

  companiaId: emp.companiaId,
  compania: emp.companiaClave,

  perfilId: emp.perfilId,
  perfil: emp.perfilClave || "Sin perfil",

  nombreCompleto: emp.nombreCompleto,

  curp: emp.curp,
  rfc: emp.rfc,

  telefono: emp.telefono,
  email: emp.email,
  direccion: emp.direccion,

  tipoRecurso: normalizeTipoRecurso(emp.tipoRecurso), // 🔥 FIX

  nss: emp.nss,

  fechaAlta: emp.fechaAlta,
  fechaBaja: emp.fechaBaja,

  estatus: emp.estatus,

  createdAt: emp.createdAt,
  updatedAt: emp.updatedAt,
});

/**
 * 🔥 ESTE ERA EL ERROR → NO ESTABA EXPUESTO
 */
const mapToFormData = (
  data: PersonalDto
): {
  clave: string;
  companiaId: number;
  perfilId?: number;
  nombreCompleto: string;
  curp?: string;
  rfc?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  tipoRecurso?: "Administrativo" | "Tecnico";
  nss?: string;
  fechaAlta?: string;
  fechaBaja?: string;
  estatus?: string;
} => ({
  clave: data.clave ?? "",
  companiaId: data.companiaId ?? 0,
  perfilId: data.perfilId ?? undefined,

  nombreCompleto: data.nombreCompleto ?? "",

  curp: data.curp ?? "",
  rfc: data.rfc ?? "",

  telefono: data.telefono ?? "",
  email: data.email ?? "",
  direccion: data.direccion ?? "",

  tipoRecurso:
    data.tipoRecurso === "Administrativo" ||
    data.tipoRecurso === "Tecnico"
      ? data.tipoRecurso
      : undefined,

  nss: data.nss ?? "",

  fechaAlta: data.fechaAlta ?? "",
  fechaBaja: data.fechaBaja ?? "",
  estatus: data.estatus ?? "A",
});

export const personalService = {
  async getAll(): Promise<PersonalDto[]> {
    const data = await handleRequest<EmpleadoResponseDTO[]>(
      axiosInstance.get("/empleados"),
    );

    return data.map(mapEmpleadoToPersonal);
  },

  async getById(id: number): Promise<PersonalDto> {
    const data = await handleRequest<EmpleadoResponseDTO>(
      axiosInstance.get(`/empleados/${id}`),
    );

    return mapEmpleadoToPersonal(data);
  },

  async create(payload: EmpleadoRequestDTO): Promise<PersonalDto> {
    const data = await handleRequest<EmpleadoResponseDTO>(
      axiosInstance.post("/empleados", payload),
    );

    return mapEmpleadoToPersonal(data);
  },

  async update(id: number, payload: EmpleadoRequestDTO): Promise<PersonalDto> {
    const data = await handleRequest<EmpleadoResponseDTO>(
      axiosInstance.put(`/empleados/${id}`, payload),
    );

    return mapEmpleadoToPersonal(data);
  },

  async delete(id: number): Promise<void> {
    await handleRequest(
      axiosInstance.delete(`/empleados/${id}`),
    );
  },

  async getPerfiles(): Promise<{ id: number; nombre: string }[]> {
    const data = await handleRequest<PerfilCatalogoDto[]>(
      axiosInstance.get("/perfiles/catalogo"),
    );

    return data.map((item) => ({
      id: item.id,
      nombre: item.clave,
    }));
  },

  async getCompanias(): Promise<Option[]> {
    const data = await handleRequest<CompaniaCatalogoDto[]>(
      axiosInstance.get("/companias/catalogo"),
    );

    return data.map((item) => ({
      value: item.id,
      label: item.clave,
    }));
  },

  /**
   * 🔥 EXPORTADO → YA NO FALLA
   */
  mapToFormData,
};