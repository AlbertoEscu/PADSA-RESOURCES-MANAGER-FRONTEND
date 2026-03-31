import { useNavigate } from "react-router-dom";
import type { Column } from "../../../shared/components/ui/DataTable";
import type { PaymentDto } from "../types/payments.types";
import { StatusBadge } from "../../../shared/components/ui/StatusBadge";
import { paymentsService } from "../services/payments.service";

// mapeo de códigos del backend a labels legibles
const statusMap: Record<
  PaymentDto["estatus"],
  "Pendiente" | "Aprobado" | "Rechazado"
> = {
  P: "Pendiente",
  A: "Aprobado",
  C: "Rechazado",
};

export const usePaymentColumns = (
  onUpdateRow: (updated: PaymentDto) => void
): Column<PaymentDto>[] => {
  const usuario = localStorage.getItem("usuario") || "admin";

  return [
    { key: "idPago", label: "ID Pago", sortable: true },
    {
      key: "nombreEmpleado",
      label: "Empleado",
      sortable: true,
      filterable: true,
    },
    {
      key: "nombreProyecto",
      label: "Proyecto",
      sortable: true,
      filterable: true,
    },
    { key: "mes", label: "Mes", sortable: true },
    { key: "anio", label: "Año", sortable: true },
    { key: "totalHoras", label: "Horas", sortable: true },
    { key: "tarifaHora", label: "Tarifa/Hora", sortable: true },
    { key: "montoTotal", label: "Monto Total", sortable: true },
    {
      key: "estatus",
      label: "Estatus",
      sortable: true,
      render: (row) => <StatusBadge status={statusMap[row.estatus]} />,
    },
    { key: "updatedAt", label: "Última Modificación", sortable: true },
    { key: "updatedBy", label: "Usuario Modificación", sortable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (row) => {
        if (row.estatus === "P") {
          // Solo pagos pendientes muestran botones
          return (
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  try {
                    const updated = await paymentsService.aprobarPago(
                      row.idPago,
                      usuario
                    );
                    onUpdateRow(updated);
                  } catch (error) {
                    console.error(error);
                    alert("Error al aprobar el pago");
                  }
                }}
                className="px-3 py-1 text-xs border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
              >
                Aprobar
              </button>

              <button
                onClick={async () => {
                  try {
                    const updated = await paymentsService.cancelarPago(
                      row.idPago,
                      usuario
                    );
                    onUpdateRow(updated);
                  } catch (error) {
                    console.error(error);
                    alert("Error al cancelar el pago");
                  }
                }}
                className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Cancelar
              </button>
            </div>
          );
        } else {
          // Pagos aprobados o cancelados muestran un badge grande
          return (
            <StatusBadge
              status={statusMap[row.estatus]}
              className="px-3 py-1 text-sm rounded-lg font-semibold"
            />
          );
        }
      },
    },
  ];
};