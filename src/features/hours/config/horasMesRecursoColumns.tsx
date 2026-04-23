import type { Column } from "../../../shared/components/ui/DataTable";
import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";
import { Pencil } from "lucide-react";


export const horasMesRecursoColumns = (
  onEdit: (row: HorasMesRecursoDto) => void,
): Column<HorasMesRecursoDto>[] => [
 

  { key: "proveedor", label: "Proveedor", filterable: true },
  { key: "fecha", label: "Fecha", sortable: true },

  { key: "empleadoId", label: "Empleado ID", sortable: true },
  { key: "usuarioWindows", label: "Usuario", filterable: true },
  { key: "nombreProfesional", label: "Nombre", filterable: true },

  { key: "axityTribe", label: "Tribe" },
  { key: "axitySquad", label: "Squad" },
  { key: "lead", label: "Lead" },
  { key: "wm", label: "WM" },
  { key: "techLead", label: "Tech Lead" },

  { key: "idJira", label: "Jira" },

  { key: "proyectoId", label: "Proyecto ID" },
  { key: "nombreProyecto", label: "Proyecto", filterable: true },

  { key: "actividades", label: "Actividades" },

  { key: "horas", label: "Horas", sortable: true },

  { key: "entregables", label: "Entregables" },
  { key: "comentarios", label: "Comentarios" },

];