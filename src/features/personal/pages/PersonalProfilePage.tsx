import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { personalService } from "../services/personal.service";

import { usePersonalProfileColumns } from "../config/personalProfileColumns";
import { usePersonalSkillsColumns } from "../config/personalSkillsColumns";

import type {
  PersonalProfileDto,
  PersonalSkillsDto,
} from "../types/personal.types";

import { ArrowLeft, Plus, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PersonalProfilePage = () => {
  const profileColumns = usePersonalProfileColumns();
  const skillsColumns = usePersonalSkillsColumns();

  const navigate = useNavigate();

  const [profiles, setProfiles] = useState<PersonalProfileDto[]>([]);
  const [skills, setSkills] = useState<PersonalSkillsDto[]>([]);

  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const pageSize = 5;

  const [profilePage, setProfilePage] = useState(1);
  const [skillsPage, setSkillsPage] = useState(1);

  const [profileFilters, setProfileFilters] = useState<any>({});
  const [skillsFilters, setSkillsFilters] = useState<any>({});

  const [profileSearch, setProfileSearch] = useState("");
  const [skillsSearch, setSkillsSearch] = useState("");

  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, s] = await Promise.all([
          personalService.getProfiles(),
          personalService.getSkills(),
        ]);

        // 🔥 YA VIENE ENRIQUECIDO DESDE BACKEND
        setProfiles(p);
        setSkills(s);
      } catch (error) {
        console.error("Error cargando data", error);
      } finally {
        setLoadingProfiles(false);
        setLoadingSkills(false);
      }
    };

    load();
  }, []);

  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* PERFIL */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={() => navigate("/personal/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Perfil</h2>

          <button
            onClick={() => setShowInactive((prev) => !prev)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition ${
              showInactive
                ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                : "bg-padsa-surface-light text-padsa-text-secondary hover:bg-padsa-surface-light/70"
            }`}
          >
            {showInactive ? <EyeOff size={14} /> : <Eye size={14} />}
            {showInactive ? "Ocultar inactivos" : "Mostrar inactivos"}
          </button>
        </div>

        <DataTable
          data={profiles.filter(
            (p) => showInactive || p.status === "ACTIVE",
          )}
          columns={profileColumns}
          loading={loadingProfiles}
          page={profilePage}
          pageSize={pageSize}
          total={
            showInactive
              ? profiles.length
              : profiles.filter((p) => p.status === "ACTIVE").length
          }
          filters={profileFilters}
          globalSearch={profileSearch}
          onGlobalSearchChange={setProfileSearch}
          onFilterChange={(f, v) =>
            setProfileFilters({ ...profileFilters, [f]: v })
          }
          onPageChange={setProfilePage}
        />
      </div>

      {/* HABILIDADES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Habilidades</h2>

        <DataTable
          data={skills}
          columns={skillsColumns}
          loading={loadingSkills}
          page={skillsPage}
          pageSize={pageSize}
          total={skills.length}
          filters={skillsFilters}
          globalSearch={skillsSearch}
          onGlobalSearchChange={setSkillsSearch}
          onFilterChange={(f, v) =>
            setSkillsFilters({ ...skillsFilters, [f]: v })
          }
          onPageChange={setSkillsPage}
        />
      </div>
    </motion.div>
  );
};