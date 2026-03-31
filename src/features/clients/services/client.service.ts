import { axiosInstance } from "../../../api/axiosInstance"; // ajusta ruta si cambia
import type { ClientDto, ClientForm } from "../types/client.types";

export const clientService = {
  async getClients(
    page: number,
    size: number,
  ): Promise<{ data: ClientDto[]; total: number }> {
    const response = await axiosInstance.get("/clientes", {
      params: {
        page: page - 1, // ⚠️ backend empieza en 0
        size,
      },
    });

    const backendData = response.data;

    // 🔥 MAPEO BACK -> FRONT
    const mapped: ClientDto[] = backendData.content.map((item: any) => ({
      id: item.idCliente,
      numeroCliente: String(item.idCliente), // ⚠️ ajustar si luego tienes numero real
      nombreCliente: item.nombreCliente,
      razonSocial: item.razonSocial,
      rfc: item.rfc,
      domicilioFiscal: item.domFiscal,
      correoElectronico: item.email,
      telefono: String(item.telefono),
      estatus: item.estatus,
      fechaUltimaModificacion: item.fechaUltimaModificacion,
      usuarioModificacion: item.usuarioModificacion,
    }));

    return {
      data: mapped,
      total: backendData.totalElements,
    };
  },

  async createClient(form: ClientForm): Promise<ClientDto> {
    const payload = {
      nombreCliente: form.nombreCliente,
      razonSocial: form.razonSocial,
      rfc: form.rfc,
      domFiscal: form.domicilioFiscal,
      email: form.correoElectronico,
      telefono: form.telefono, // 🔥 ya es string
      usuarioModificacion: "admin", // ⚠️ obligatorio
    };

    const response = await axiosInstance.post("/clientes", payload);

    const item = response.data;

    return {
      id: item.idCliente,
      numeroCliente: String(item.idCliente),
      nombreCliente: item.nombreCliente,
      razonSocial: item.razonSocial,
      rfc: item.rfc,
      domicilioFiscal: item.domFiscal,
      correoElectronico: item.email,
      telefono: item.telefono,
      estatus: item.estatus,
      fechaUltimaModificacion: item.fechaUltimaModificacion,
      usuarioModificacion: item.usuarioModificacion,
    };
  },
  async updateClient(id: number, form: ClientForm): Promise<ClientDto> {
    const payload = {
      nombreCliente: form.nombreCliente,
      razonSocial: form.razonSocial,
      rfc: form.rfc,
      domFiscal: form.domicilioFiscal,
      email: form.correoElectronico,
      telefono: form.telefono,
      usuarioModificacion: "admin", // ⚠️ obligatorio
    };

    const response = await axiosInstance.put(`/clientes/${id}`, payload);

    const item = response.data;

    return {
      id: item.idCliente,
      numeroCliente: String(item.idCliente),
      nombreCliente: item.nombreCliente,
      razonSocial: item.razonSocial,
      rfc: item.rfc,
      domicilioFiscal: item.domFiscal,
      correoElectronico: item.email,
      telefono: item.telefono,
      estatus: item.estatus,
      fechaUltimaModificacion: item.fechaUltimaModificacion,
      usuarioModificacion: item.usuarioModificacion,
    };
  },
};
