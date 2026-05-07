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

import { useAuth } from "../../auth/context/useAuth";

export const PersonalProfilePage = () => {
  const { isAdmin } = useAuth();
  const profileColumns = usePersonalProfileColumns(isAdmin);
  const skillsColumns = usePersonalSkillsColumns(isAdmin);

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

        <h2 className="text-xl font-semibold text-white">Perfil</h2>

        <DataTable
          data={profiles}
          columns={profileColumns}
          loading={loadingProfiles}
          page={profilePage}
          pageSize={pageSize}
          total={profiles.length}
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