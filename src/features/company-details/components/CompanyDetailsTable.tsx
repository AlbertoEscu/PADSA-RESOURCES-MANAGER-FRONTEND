import type { CompanyDto } from "../types/companyDetails.types";
import { TableSkeleton } from "../../../features/dashboard/components/TableSkeleton";

interface Props {
  data: CompanyDto[];
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
  search: string;
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
}

export const CompanyDetailsTable = ({
  data,
  loading,
  total,
  page,
  pageSize,
  search,
  onSearchChange,
  onPageChange
}: Props) => {

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Buscar compañía..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-padsa-surface-light border border-padsa-border rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-padsa-primary w-64"
      />

      <div className="bg-padsa-surface border border-padsa-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-padsa-surface-light border-b border-padsa-border text-padsa-text-secondary">
            <tr>
              <th className="px-4 py-3">Número</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">RFC</th>
              <th className="px-4 py-3">Dirección Fiscal</th>
              <th className="px-4 py-3">Estatus</th>
              <th className="px-4 py-3">Última Modificación</th>
              <th className="px-4 py-3">Usuario</th>
            </tr>
          </thead>

          <tbody>

            {loading && <TableSkeleton />}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-padsa-text-secondary">
                  No se encontraron compañías.
                </td>
              </tr>
            )}

            {!loading && data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-padsa-border hover:bg-padsa-surface-light/40 transition"
              >
                <td className="px-4 py-3 text-white">{row.numeroCompania}</td>
                <td className="px-4 py-3 text-white">{row.nombreCompania}</td>
                <td className="px-4 py-3">{row.rfc}</td>
                <td className="px-4 py-3">{row.direccionFiscal}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    row.estatus === "Activo"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {row.estatus}
                  </span>
                </td>
                <td className="px-4 py-3">{row.fechaUltimaModificacion}</td>
                <td className="px-4 py-3">{row.usuarioModificacion}</td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-end gap-2">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1 rounded bg-padsa-surface-light disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="text-sm text-padsa-text-secondary">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1 rounded bg-padsa-surface-light disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}

    </div>
  );
};