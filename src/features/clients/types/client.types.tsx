export interface ClientDto {
  id: number;
  numeroCliente: string;
  nombreCliente: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscal: string;
  correoElectronico: string;
  telefono: string;
  estatus: "Activo" | "Inactivo";
  fechaAlta: string; // 👈 NUEVO
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
}


export type ClientForm = {
  id?: number;
  numeroCliente: string;
  nombreCliente: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscal: string;
  correoElectronico: string;
  telefono: string;
  estatus: "Activo" | "Inactivo";
  fechaAlta?: string; // 👈 NUEVO
};