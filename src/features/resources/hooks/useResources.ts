import { useEffect, useState } from "react";

interface Resource {
  id: number;
  numeroRecurso: string;
  numeroPersonal: string;
  tipoRecurso: string;
  numeroProyecto: string;
}

interface UseResourcesParams {
  page: number;
  pageSize: number;
  search: string;
}

export const useResources = ({ page, pageSize, search }: UseResourcesParams) => {
  const [data, setData] = useState<Resource[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🔥 MOCK TEMPORAL
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockData: Resource[] = Array.from({ length: 37 }).map((_, i) => ({
          id: i + 1,
          numeroRecurso: `R-${i + 1}`,
          numeroPersonal: `P-${i + 1}`,
          tipoRecurso: i % 2 === 0 ? "Interno" : "Externo",
          numeroProyecto: `PR-${i + 1}`,
        }));

        const filtered = mockData.filter(r =>
          r.numeroRecurso.toLowerCase().includes(search.toLowerCase())
        );

        const start = (page - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        setData(paginated);
        setTotal(filtered.length);

      } catch (err) {
        setError("Error al cargar los recursos");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [page, pageSize, search]);

  return { data, total, loading, error };
};