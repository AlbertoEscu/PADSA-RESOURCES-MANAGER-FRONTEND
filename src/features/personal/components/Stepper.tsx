import { useLocation, useNavigate } from "react-router-dom";

interface StepperProps {
  currentStep: number;
  empleadoId: number | null;
}

export const Stepper = ({ currentStep, empleadoId }: StepperProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 base dinámico SOLO por ID
  const basePath = empleadoId
    ? `/personal/edit/${empleadoId}`
    : "/personal/new";

  const steps = [
    { id: 1, label: "Datos", path: `${basePath}` },
    { id: 2, label: "Perfil", path: `${basePath}/profile` },
    { id: 3, label: "Habilidades", path: `${basePath}/skills` },
    { id: 4, label: "Proyecto", path: `${basePath}/project` },
  ];

  const handleNavigation = (step: (typeof steps)[0]) => {
    // 🔥 REGLA CLAVE:
    // No puedes avanzar si no existe ID (no se ha guardado)
    if (!empleadoId && step.id !== 1) return;

    navigate(step.path);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      {steps.map((step, index) => {
        const isActive = location.pathname === step.path;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              onClick={() => handleNavigation(step)}
              className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm transition
                ${
                  isActive
                    ? "bg-red-500 text-white"
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-300"
                }`}
            >
              {step.id}
            </div>

            <span className="text-sm text-gray-300">
              {step.label}
            </span>

            {index < steps.length - 1 && (
              <div className="w-8 h-[1px] bg-gray-600" />
            )}
          </div>
        );
      })}
    </div>
  );
};