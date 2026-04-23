import { useNavigate } from "react-router-dom";
import type { EmpleadoProyectoResponseDTO } from "../types/personal.types";
import type { Column } from "../../../shared/components/ui/DataTable";
import { Pencil } from "lucide-react";

export const usePersonalProjectColumns = () => {
  const navigate = useNavigate();

  const columns: Column<EmpleadoProyectoResponseDTO>[] = [
    {
      key: "id",
      label: "ID",
      filterable: true,
    },

    {
      key: "clave",
      label: "Clave",
      filterable: true,
    },

    {
      key: "empleadoId",
      label: "ID Empleado",
      filterable: true,
    },

    {
      key: "empleadoClave",
      label: "Empleado",
      filterable: true,
    },

    {
      key: "proyectoId",
      label: "ID Proyecto",
      filterable: true,
    },

    {
      key: "proyectoClave",
      label: "Proyecto",
      filterable: true,
    },

    {
      key: "estatus",
      label: "Estatus",
    },

    {
      key: "createdAt",
      label: "Creado",
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },

    {
      key: "updatedAt",
      label: "Actualizado",
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
    },

  ];

  return columns;
};