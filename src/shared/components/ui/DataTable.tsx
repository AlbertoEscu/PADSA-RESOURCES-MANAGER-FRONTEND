import { TableSkeleton } from "../../../features/dashboard/components/TableSkeleton";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  filters: Partial<Record<keyof T, string>>;
  onFilterChange: (field: keyof T, value: string) => void;
  onPageChange: (page: number) => void;

  globalSearch?: string;
  onGlobalSearchChange?: (value: string) => void;

  onFilteredDataChange?: (rows: T[]) => void;
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  loading,
  page,
  pageSize,
  total,
  filters,
  onFilterChange,
  globalSearch,
  onGlobalSearchChange,
  onPageChange,
  onFilteredDataChange, // ⭐ AGREGAR
}: Props<T>) {
  const totalPages = Math.ceil(total / pageSize);

  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const prevDataRef = useRef<string>("");

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    Object.keys(filters).forEach((key) => {
      onFilterChange(key as keyof T, "");
    });

    onGlobalSearchChange?.("");
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortKey];
      const bValue = (b as any)[sortKey];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortKey, sortDirection]);

  useEffect(() => {
    if (!onFilteredDataChange) return;

    const current = JSON.stringify(sortedData);

    if (prevDataRef.current !== current) {
      prevDataRef.current = current;
      onFilteredDataChange(sortedData);
    }
  }, [sortedData, onFilteredDataChange]);

  return (
    <div className="space-y-4">
      {/* SEARCH + ACTIONS */}
      <div className="flex flex-col gap-3">
        {/* GLOBAL SEARCH */}
        <div className="flex justify-between items-center">
          <input
            value={globalSearch ?? ""}
            onChange={(e) => onGlobalSearchChange?.(e.target.value)}
            placeholder="Buscar recurso, proyecto, usuario..."
            className="w-72 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-padsa-primary"
          />

          <div className="text-sm text-padsa-text-secondary">
            {total} registros
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => (
              <span
                key={key}
                className="flex items-center gap-2 bg-padsa-primary/20 text-padsa-primary px-3 py-1 rounded-full text-xs"
              >
                {key}: {value}
                <button
                  onClick={() => onFilterChange(key as keyof T, "")}
                  className="text-xs opacity-70 hover:opacity-100"
                >
                  ✕
                </button>
              </span>
            ))}

          {globalSearch && (
            <span className="flex items-center gap-2 bg-padsa-primary/20 text-padsa-primary px-3 py-1 rounded-full text-xs">
              búsqueda: {globalSearch}
              <button
                onClick={() => onGlobalSearchChange?.("")}
                className="text-xs opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </span>
          )}

          {(globalSearch || Object.values(filters).some(Boolean)) && (
            <button
              onClick={clearFilters}
              className="text-xs text-padsa-text-secondary hover:text-white"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-padsa-surface border border-padsa-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-padsa-border">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-padsa-surface-light border-b border-padsa-border sticky top-0 z-10">
              {/* HEADERS */}
              <tr className="text-left text-padsa-text-secondary">
                {columns.map((col, index) => (
                  <th
                    key={String(col.key)}
                    className={`
                      px-6 py-4
                      ${col.sortable ? "cursor-pointer select-none" : ""}

                      ${
                        index === 0
                          ? "sticky left-0 bg-padsa-surface-light z-20 border-r border-padsa-border"
                          : ""
                      }

                      ${
                        index === columns.length - 1
                          ? "sticky right-0 bg-padsa-surface-light z-20 border-l border-padsa-border"
                          : ""
                      }
                    `}
                    onClick={() =>
                      col.sortable ? handleSort(col.key as keyof T) : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      {col.label}

                      {col.sortable && sortKey === col.key && (
                        <span className="text-xs">
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>

              {/* FILTER INPUTS */}
              <tr className="bg-padsa-surface-light/40">
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-6 py-2">
                    {col.filterable ? (
                      <input
                        value={filters[col.key as keyof T] ?? ""}
                        onChange={(e) =>
                          onFilterChange(col.key as keyof T, e.target.value)
                        }
                        className="w-full bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-padsa-primary"
                        placeholder="Filtrar..."
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading && <TableSkeleton />}

              {!loading && sortedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-10 text-padsa-text-secondary"
                  >
                    No se encontraron resultados
                  </td>
                </tr>
              )}

              {!loading &&
                sortedData.map((row) => (
                  <tr
                    key={row.id}
                    className="
                    border-b border-padsa-border
                    hover:bg-padsa-surface-light/60
                    transition-colors
                    group
                    "
                  >
                    {columns.map((col, index) => (
                      <td
                        key={String(col.key)}
                        className={`
                          px-6 py-4 text-white

                          ${
                            index === 0
                              ? "sticky left-0 bg-padsa-surface z-10 border-r border-padsa-border"
                              : ""
                          }

                          ${
                            index === columns.length - 1
                              ? "sticky right-0 bg-padsa-surface z-10 border-l border-padsa-border"
                              : ""
                          }
                        `}
                      >
                        {col.render
                          ? col.render(row)
                          : String((row as any)[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center text-sm">
          <div className="text-padsa-text-secondary">
            Mostrando {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, total)} de {total}
          </div>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 rounded bg-padsa-surface-light disabled:opacity-40"
            >
              Anterior
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 rounded bg-padsa-surface-light disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
