import type { Column } from "../../../shared/components/ui/DataTable";
import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";
import { Pencil } from "lucide-react";

export const horasMesRecursoColumns = (
  onEdit: (row: HorasMesRecursoDto) => void,
): Column<HorasMesRecursoDto>[] => [
  {
    key: "idHoras",
    label: "ID",
    sortable: true,
  },
  {
    key: "numeroPersonal",
    label: "Número Personal",
    sortable: true,
    filterable: true,
  },
  {
    key: "nombrePersonal",
    label: "Nombre Personal",
    sortable: true,
    filterable: true,
  },
  {
    key: "anio",
    label: "Año",
    sortable: true,
  },
  {
    key: "mes",
    label: "Mes",
    sortable: true,
    render: (row) => {
      const meses = [
        "",
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
      ];
      return meses[row.mes];
    }
  },
  {
    key: "horasSemana1",
    label: "Semana 1",
    sortable: true,
  },
  {
    key: "horasSemana2",
    label: "Semana 2",
    sortable: true,
  },
  {
    key: "horasSemana3",
    label: "Semana 3",
    sortable: true,
  },
  {
    key: "horasSemana4",
    label: "Semana 4",
    sortable: true,
  },
  {
    key: "horasSemana5",
    label: "Semana 5",
    sortable: true,
  },
  {
    key: "horasVacaciones",
    label: "Vacaciones",
    sortable: true,
  },
  {
    key: "horasMes",
    label: "Horas Mes",
    sortable: true,
  },
  {
    key: "fechaUltimaModificacion",
    label: "Fecha modificación",
    sortable: true,
  },
  {
    key: "usuarioModificacion",
    label: "Usuario modificación",
    sortable: true,
  },
  {
    key: "acciones",
    label: "",
    render: (row) => (
      <button
        onClick={() => onEdit(row)}
        className="
        flex items-center gap-1
        px-3 py-1 text-xs
        border border-padsa-primary
        text-padsa-primary
        rounded-lg
        transition-all duration-200
        hover:bg-padsa-primary
        hover:text-white
        hover:shadow-md
      "
      >
        <Pencil size={14} />
        Editar
      </button>
    ),
  },
];