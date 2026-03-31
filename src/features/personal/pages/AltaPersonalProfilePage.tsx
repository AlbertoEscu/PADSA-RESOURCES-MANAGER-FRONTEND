import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { usePersonalWizard } from "../components/PersonalWizardContext";
import { Stepper } from "../components/Stepper";
import { isDatosValid } from "../components/wizardValidation";
import { WizardHeader } from "../components/WizardHeader";
import { personalService } from "../services/personal.service";

type Nivel = "junior" | "middle" | "senior" | "no_aplica";

interface PerfilItem {
  idPerfil?: number; // 🔥 clave para EDIT
  perfil: string;
  nivel: Nivel;
}

export const AltaPersonalProfilePage = () => {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState("");
  const [nivel, setNivel] = useState<Nivel>("junior");
  const [perfiles, setPerfilesLocal] = useState<PerfilItem[]>([]);
  const [originalPerfiles, setOriginalPerfiles] = useState<PerfilItem[]>([]);

  const {
    data,
    setPerfiles,
    mode,
    id: wizardId,
    isLoading,
  } = usePersonalWizard();
  const empleadoId = wizardId;

  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm";

  const labelStyle = "text-xs text-padsa-text-secondary mb-1 block";

  /**
   * ==========================================
   * 🔥 PRECARGA (EDIT desde backend)
   * ==========================================
   */
  useEffect(() => {
    const loadProfiles = async () => {
      if (!empleadoId) return;

      try {
        const res = await personalService.getProfilesByEmpleadoId(
          Number(empleadoId),
        );

        const mapped = res.map((item) => ({
          idPerfil: item.idPerfil,
          perfil: item.perfil,
          nivel: item.nivel as Nivel,
        }));

        setPerfilesLocal(mapped);
        setOriginalPerfiles(mapped);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setPerfilesLocal([]);
          setOriginalPerfiles([]);
          return;
        }

        console.error("❌ Error cargando perfiles", error);
      }
    };

    loadProfiles();
  }, [empleadoId]);

  /**
   * ==========================================
   * 🔥 VALIDACIÓN WIZARD (CREATE)
   * ==========================================
   */
  useEffect(() => {
    if (mode !== "create") return;
    if (isLoading) return;
    if (!data?.datosGenerales) return;

    if (!isDatosValid(data)) {
      navigate("/personal/new");
    }
  }, [data, mode, isLoading]);

  /**
   * ==========================================
   * ➕ AGREGAR PERFIL
   * ==========================================
   */
  const handleAdd = () => {
    if (!perfil.trim()) return;

    const exists = perfiles.some(
      (p) => p.perfil.toLowerCase() === perfil.toLowerCase(),
    );

    if (exists) return;

    setPerfilesLocal((prev) => [...prev, { perfil: perfil.trim(), nivel }]);

    setPerfil("");
    setNivel("junior");
  };

  /**
   * ==========================================
   * ❌ ELIMINAR PERFIL
   * ==========================================
   */
  const handleDelete = (index: number) => {
    setPerfilesLocal((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * ==========================================
   * 💾 GUARDAR / SIGUIENTE
   * ==========================================
   */
  const handleNext = async () => {
    try {
      if (mode === "edit" && empleadoId) {
        const toCreate = perfiles.filter((p) => !p.idPerfil);
        const toUpdate = perfiles.filter((p) => p.idPerfil);

        const toDelete = originalPerfiles.filter(
          (op) => !perfiles.some((p) => p.idPerfil === op.idPerfil),
        );

        // 🟢 CREATE
        await Promise.all(
          toCreate.map((p) =>
            personalService.createProfile({
              idEmpleado: Number(empleadoId),
              perfil: p.perfil,
              nivel: p.nivel,
              usuarioModificacion: "admin",
            }),
          ),
        );

        // 🔵 UPDATE
        await Promise.all(
          toUpdate.map((p) =>
            personalService.updateProfile(p.idPerfil!, {
              idEmpleado: Number(empleadoId),
              perfil: p.perfil,
              nivel: p.nivel,
              usuarioModificacion: "admin",
            }),
          ),
        );

        // // 🔴 DELETE (si existe endpoint)
        // if (personalService.deleteProfile) {
        //   await Promise.all(
        //     toDelete.map((p) =>
        //       personalService.deleteProfile(p.idPerfil)
        //     )
        //   );
        // }
      } else {
        // 🟡 CREATE FLOW (wizard)
        setPerfiles(perfiles);
      }

      navigate(
        mode === "edit"
          ? `/personal/edit/${empleadoId}/skills`
          : `/personal/new/skills`,
      );
    } catch (error) {
      console.error("❌ Error guardando perfiles", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">
        {mode === "edit" ? "Editar Perfil" : "Alta Personal - Perfil"}
      </h1>

      <WizardHeader />

      <Stepper
        currentStep={2}
        empleadoId={empleadoId ? Number(empleadoId) : null}
      />

      <div className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8 max-w-5xl">
        {/* FORM */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Agregar Perfil
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className={labelStyle}>Perfil</label>
              <input
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Nivel</label>

              <div className="flex gap-2">
                {[
                  { label: "Junior", value: "junior" },
                  { label: "Middle", value: "middle" },
                  { label: "Senior", value: "senior" },
                  { label: "N/A", value: "no_aplica" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setNivel(item.value as Nivel)}
                    className={`px-3 py-2 rounded-lg text-xs ${
                      nivel === item.value
                        ? "bg-padsa-primary text-white"
                        : "bg-padsa-surface-light"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleAdd}
                className="w-full bg-padsa-primary text-white px-4 py-2 rounded-lg"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Perfiles agregados
          </h2>

          {perfiles.length === 0 ? (
            <p className="text-sm text-padsa-text-secondary">
              No hay perfiles agregados
            </p>
          ) : (
            <table className="w-full text-sm border border-padsa-border rounded-lg">
              <thead className="bg-padsa-surface-light">
                <tr>
                  <th className="p-3">Perfil</th>
                  <th className="p-3">Nivel</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {perfiles.map((item, index) => (
                  <tr key={item.idPerfil ?? index}>
                    <td className="p-3">{item.perfil}</td>
                    <td className="p-3 capitalize">
                      {item.nivel.replace("_", " ")}
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => handleDelete(index)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-4 pt-4 border-t border-padsa-border">
          <button
            onClick={() => navigate("/personal")}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleNext}
            disabled={perfiles.length === 0}
            className="px-6 py-2 bg-padsa-primary text-white rounded-lg"
          >
            Siguiente
          </button>
        </div>
      </div>
    </motion.div>
  );
};
