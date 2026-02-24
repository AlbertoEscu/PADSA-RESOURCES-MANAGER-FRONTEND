import React from "react";
import { useAuth } from "../../../features/auth/context/useAuth";

export interface Resource {
  recurso: string;
  personal: string;
  tipo: string;
  proyecto: string;
  col5: string;
  col6: string;
  col7: string;
}

export const useDashboardData = () => {
  const { user } = useAuth();

  const [resources, setResources] = React.useState<Resource[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setResources([
        {
          recurso: "R001",
          personal: "Juan Perez",
          tipo: "Interno",
          proyecto: "P001",
          col5: "",
          col6: "",
          col7: "",
        },
        {
          recurso: "R002",
          personal: "Maria Lopez",
          tipo: "Externo",
          proyecto: "P002",
          col5: "",
          col6: "",
          col7: "",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { user: user?.username ?? "", resources, loading };
};
