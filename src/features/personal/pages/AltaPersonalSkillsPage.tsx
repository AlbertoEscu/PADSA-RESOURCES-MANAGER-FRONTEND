import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

import { usePersonalWizard } from "../components/PersonalWizardContext";
import { Stepper } from "../components/Stepper";
import { WizardHeader } from "../components/WizardHeader";

type SkillCategory =
  | "lenguajes"
  | "basesDatos"
  | "frameworks"
  | "cursos"
  | "certificaciones";

const categoriesConfig = [
  { key: "lenguajes", label: "Lenguajes de programación" },
  { key: "basesDatos", label: "Bases de datos" },
  { key: "frameworks", label: "Frameworks" },
  { key: "cursos", label: "Cursos" },
  { key: "certificaciones", label: "Certificaciones" },
] as const;

export const AltaPersonalSkillsPage = () => {
  const navigate = useNavigate();

  const { setSkills, data, mode, id } = usePersonalWizard();

  const [inputs, setInputs] = useState<Record<SkillCategory, string>>({
    lenguajes: "",
    basesDatos: "",
    frameworks: "",
    cursos: "",
    certificaciones: "",
  });

  const [skills, setSkillsLocal] = useState<Record<SkillCategory, string[]>>({
    lenguajes: [],
    basesDatos: [],
    frameworks: [],
    cursos: [],
    certificaciones: [],
  });

  const [initialized, setInitialized] = useState(false); // 🔥 control clave

  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-padsa-primary";

  // 🔥 CARGA DE DATOS EN EDIT (FIX REAL)
  useEffect(() => {
    if (mode !== "edit") return;
    if (!data?.skills) return;
    if (initialized) return;

    setSkillsLocal({
      lenguajes: data.skills.lenguajes ?? [],
      basesDatos: data.skills.basesDatos ?? [],
      frameworks: data.skills.frameworks ?? [],
      cursos: data.skills.cursos ?? [],
      certificaciones: data.skills.certificaciones ?? [],
    });

    setInitialized(true);
  }, [data?.skills, mode, initialized]);

  // 🔧 HANDLERS

  const handleChange = (key: SkillCategory, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = (key: SkillCategory) => {
    const value = inputs[key].trim();
    if (!value) return;

    setSkillsLocal((prev) => {
      if (prev[key].includes(value)) return prev;

      return {
        ...prev,
        [key]: [...prev[key], value],
      };
    });

    setInputs((prev) => ({ ...prev, [key]: "" }));
  };

  const handleDelete = (key: SkillCategory, index: number) => {
    setSkillsLocal((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    setSkills(skills);

    const nextPath =
      mode === "edit"
        ? `/personal/edit/${id}/project`
        : "/personal/new/project";

    navigate(nextPath);
  };

  const isEmpty = Object.values(skills).every((arr) => arr.length === 0);

  // DEBUG (puedes quitar después)
  useEffect(() => {
    console.log("🔥 SKILLS STATE:", skills);
    console.log("🔥 DATA SKILLS:", data?.skills);
  }, [skills, data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">
        Alta Personal - Habilidades
      </h1>

      <WizardHeader />
      <Stepper />

      <div className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8 max-w-5xl">
        {categoriesConfig.map(({ key, label }) => (
          <div key={key}>
            <h2 className="text-lg font-semibold text-white mb-4">
              {label}
            </h2>

            {/* INPUT */}
            <div className="flex gap-3 mb-4">
              <input
                value={inputs[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Agregar ${label.toLowerCase()}`}
                className={inputStyle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd(key);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => handleAdd(key)}
                className="bg-padsa-primary text-white px-4 rounded-lg"
              >
                Agregar
              </button>
            </div>

            {/* LISTA */}
            {skills[key].length === 0 ? (
              <p className="text-sm text-padsa-text-secondary">
                No hay registros
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills[key].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-padsa-surface-light border border-padsa-border px-3 py-1 rounded-full text-sm"
                  >
                    <span>{item}</span>

                    <button
                      onClick={() => handleDelete(key, index)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* TOTAL */}
        <div className="pt-4 border-t border-padsa-border">
          <h3 className="text-sm text-padsa-text-secondary mb-2">
            Total de habilidades:
          </h3>

          <p className="text-white font-semibold">
            {Object.values(skills).flat().length} habilidades agregadas
          </p>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-4 pt-4 border-t border-padsa-border">
          <button
            type="button"
            onClick={() => {
              if (mode === "edit") {
                navigate(`/personal/edit/${id}/profile`);
              } else {
                navigate("/personal");
              }
            }}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleNext}
            disabled={isEmpty}
            className="px-6 py-2 bg-padsa-primary rounded-lg text-white disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </motion.div>
  );
};