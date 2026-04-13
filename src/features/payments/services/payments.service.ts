import { axiosInstance } from "../../../api/axiosInstance";
import type { PaymentDto } from "../types/payments.types";

export const paymentsService = {
  async getPayments(page = 0, size = 10): Promise<PaymentDto[]> {
    const response = await axiosInstance.get<{ content: PaymentDto[] }>(
      `/pagos?page=${page}&size=${size}`
    );
    // Mapear idPago a id para DataTable
    return response.data.content.map((p) => ({ ...p, id: p.idPago }));
  },

  async aprobarPago(idPago: number, usuario: string): Promise<PaymentDto> {
    const response = await axiosInstance.put<PaymentDto>(
      `/pagos/${idPago}/aprobar`,
      {},
      { headers: { "X-Usuario-Modificacion": usuario } }
    );
    return { ...response.data, id: response.data.idPago };
  },

  async cancelarPago(idPago: number, usuario: string): Promise<PaymentDto> {
    const response = await axiosInstance.put<PaymentDto>(
      `/pagos/${idPago}/cancelar`,
      {},
      { headers: { "X-Usuario-Modificacion": usuario } }
    );
    return { ...response.data, id: response.data.idPago };
  },
 async calcularPagosProyecto(
  idProyecto: number,
  mes: number,
  anio: number
): Promise<PaymentDto[]> {
  const response = await axiosInstance.post<PaymentDto[]>(
    `/pagos/proyecto/${idProyecto}/calcular-todos`,
    null,
    {
      params: { mes, anio },
      headers: {
        "X-Usuario-Modificacion": "admin",
      },
    }
  );

  return response.data.map((p) => ({ ...p, id: p.idPago }));
},
};