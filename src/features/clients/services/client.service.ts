import { axiosInstance } from "../../../api/axiosInstance";
import type { ClientDto, ClientForm } from "../types/client.types";

/**
 * 🔥 BACK → FRONT
 */
const mapToClientDto = (item: any): ClientDto => ({
  id: item.id,
  clave: item.clave,
  nombre: item.nombre,
  razonSocial: item.razonSocial,
  rfc: item.rfc,
  domicilioFiscal: item.domicilioFiscal,
  email: item.email,
  telefono: item.telefono,
  estatus: item.estatus,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  createdBy: item.createdBy,
  updatedBy: item.updatedBy,
});

/**
 * 🔥 FRONT → BACK
 */
const mapToRequest = (form: ClientForm) => ({
  clave: form.clave,
  nombre: form.nombre,
  razonSocial: form.razonSocial,
  rfc: form.rfc,
  domicilioFiscal: form.domicilioFiscal,
  email: form.email,
  telefono: form.telefono,
  estatus: form.estatus,
});

export const clientService = {
  async getClients(): Promise<ClientDto[]> {
    const response = await axiosInstance.get("/clientes");
    return response.data.map(mapToClientDto);
  },

  async getById(id: number): Promise<ClientDto> {
    const response = await axiosInstance.get(`/clientes/${id}`);
    return mapToClientDto(response.data);
  },

  async createClient(form: ClientForm): Promise<ClientDto> {
    const response = await axiosInstance.post(
      "/clientes",
      mapToRequest(form),
    );
    return mapToClientDto(response.data);
  },

  async updateClient(id: number, form: ClientForm): Promise<ClientDto> {
    const response = await axiosInstance.put(
      `/clientes/${id}`,
      mapToRequest(form),
    );
    return mapToClientDto(response.data);
  },

  async deleteClient(id: number): Promise<void> {
    await axiosInstance.delete(`/clientes/${id}`);
  },
};