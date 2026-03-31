import { usePersonalWizard } from "./PersonalWizardContext";

export const WizardHeader = () => {
  const { data, mode, id, isLoading } = usePersonalWizard();

  if (isLoading) {
    return (
      <div className="bg-padsa-surface border border-padsa-border rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400">Cargando información...</p>
      </div>
    );
  }

  // 🔥 En create aún no hay datos
  if (mode === "create" && !data?.datosGenerales) {
    return (
      <div className="bg-padsa-surface border border-padsa-border rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400">Nuevo registro</p>
        <p className="text-white font-semibold">Alta de personal</p>
      </div>
    );
  }

  const info = data?.datosGenerales;

  return (
    <div className="bg-padsa-surface border border-padsa-border rounded-xl p-5 mb-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        
        {/* LADO IZQUIERDO */}
        <div>
          <p className="text-xs text-gray-400">
            {mode === "edit" ? "Editando empleado" : "Nuevo empleado"}
          </p>

          <p className="text-lg font-semibold text-white">
            {info?.nombreCompleto || "Sin nombre"}
          </p>

          <p className="text-xs text-gray-400">
            No. Empleado: {info?.numeroEmpleado || "-"}
          </p>
        </div>

        {/* LADO DERECHO */}
        <div className="flex gap-4 text-xs text-gray-300">
          <div>
            <span className="text-gray-500">Compañía:</span>{" "}
            {info?.compania || "-"}
          </div>

          {mode === "edit" && (
            <div>
              <span className="text-gray-500">ID:</span> {id}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};