import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePersonalWizard } from "./PersonalWizardContext";
import { personalService } from "../services/personal.service";

export const PersonalWizardLayout = () => {
  const { id } = useParams();

  const {
    setMode,
    setId,
    setAllData,
    reset,
    isLoading,
    setIsLoading,
  } = usePersonalWizard();

  useEffect(() => {
    let isMounted = true; // 🔥 evita problemas async

    const loadData = async () => {
      if (id) {
        setMode("edit");
        setId(id);
        setIsLoading(true);

        try {
          const resp = await personalService.getById(id);

          if (!isMounted) return;

          setAllData({
            datosGenerales: personalService.mapToFormData(resp),
            perfiles: resp.perfiles || [],
            skills: resp.skills || {},
            proyecto: resp.proyecto || null,
          });
        } catch (error) {
          console.error("Error loading personal:", error);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      } else {
        reset();
      }
    };

    loadData();

    return () => {
      isMounted = false; // 🔥 cleanup importante
    };
  }, [id]);

  // 🔥 LOADING CONTROLADO
  if (id && isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-padsa-background">
        <Outlet />
      </div>
    </div>
  );
};