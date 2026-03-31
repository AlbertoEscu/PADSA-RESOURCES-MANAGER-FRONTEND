import { useLocation } from "react-router-dom";

const steps = [
  { path: "/personal/new", label: "Datos" },
  { path: "/personal/new/profile", label: "Perfil" },
  { path: "/personal/new/skills", label: "Habilidades" },
  { path: "/personal/new/project", label: "Proyecto" },
];

export const WizardSidebar = () => {
  const location = useLocation();

  const currentIndex = steps.findIndex((s) =>
    location.pathname.startsWith(s.path)
  );

  return (
    <div className="w-64 bg-padsa-surface border-r border-padsa-border p-6">
      <h2 className="text-white font-semibold mb-6">Alta Personal</h2>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.path} className="flex items-center gap-3">
              
              {/* Círculo */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-padsa-primary text-white"
                      : "bg-padsa-surface-light text-gray-400"
                  }
                `}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Texto */}
              <span
                className={`text-sm ${
                  isActive
                    ? "text-white"
                    : "text-padsa-text-secondary"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};