export interface ClientDto {
  id: number;
  clave: string;
  nombre: string;
  razonSocial: string;
  rfc: string;
  domicilioFiscal: string;
  email: string;
  telefono: string;
  estatus: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export type ClientForm = {
  clave: string;
  nombre: string;
  razonSocial?: string;
  rfc?: string;
  domicilioFiscal?: string;
  email?: string;
  telefono?: string;
  estatus: string;
};