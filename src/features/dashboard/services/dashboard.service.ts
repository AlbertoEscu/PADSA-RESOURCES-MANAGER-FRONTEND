import { axiosInstance } from "../../../api/axiosInstance";
import type { ResourceDto } from "../types/dashboard.types";
import type { DashboardKpis } from "../types/dashboard.types";

export const dashboardService = {

  async getKpis(): Promise<DashboardKpis> {
    return axiosInstance
      .get<DashboardKpis>("/dashboard/kpis")
      .then(res => res.data);
  },

  async getResources(): Promise<ResourceDto[]> {

    // 🔵 Si aún no tienes endpoint real, deja mock
    await new Promise(resolve => setTimeout(resolve, 900));

    return [
      { id: 1, numeroRecurso: "REC-001", numeroPersonal: "PER-101", tipoRecurso: "Consultor", numeroProyecto: "PRJ-201" },
      { id: 2, numeroRecurso: "REC-002", numeroPersonal: "PER-102", tipoRecurso: "Dev", numeroProyecto: "PRJ-202" },
      { id: 3, numeroRecurso: "REC-003", numeroPersonal: "PER-103", tipoRecurso: "QA", numeroProyecto: "PRJ-203" },
      { id: 4, numeroRecurso: "REC-004", numeroPersonal: "PER-104", tipoRecurso: "DevOps", numeroProyecto: "PRJ-204" },
      { id: 5, numeroRecurso: "REC-005", numeroPersonal: "PER-105", tipoRecurso: "PM", numeroProyecto: "PRJ-205" },
      { id: 6, numeroRecurso: "REC-006", numeroPersonal: "PER-106", tipoRecurso: "Consultor", numeroProyecto: "PRJ-206" },
    ];
  }

};