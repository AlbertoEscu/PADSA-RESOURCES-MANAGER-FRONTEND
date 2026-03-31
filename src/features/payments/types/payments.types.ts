export type PaymentStatus = "P" | "A" | "C";

export interface PaymentDto {
  id: number; // necesario para DataTable, será igual a idPago
  idPago: number;
  idEmpleado: number;
  nombreEmpleado: string;
  idProyecto: number;
  nombreProyecto: string;
  mes: number;
  anio: number;
  totalHoras: number;
  tarifaHora: number;
  montoTotal: number;
  estatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}