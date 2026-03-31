import type { ResourceDto } from "../types/dashboard.types";

// cuando exista backend real:
// import { axiosInstance } from "../../../api/axiosInstance";

export const dashboardService = {

  async getResources(): Promise<ResourceDto[]> {

    // 🔵 Cuando exista endpoint real:
    /*
    return axiosInstance
      .get<ResourceDto[]>("/dashboard/resources")
      .then(res => res.data);
    */

    // 🔵 Mock temporal
    await new Promise(resolve => setTimeout(resolve, 900));

    const mock: ResourceDto[] = [
      { id: 1, numeroRecurso: "REC-001", numeroPersonal: "PER-101", tipoRecurso: "Consultor", numeroProyecto: "PRJ-201" },
      { id: 2, numeroRecurso: "REC-002", numeroPersonal: "PER-102", tipoRecurso: "Dev", numeroProyecto: "PRJ-202" },
      { id: 3, numeroRecurso: "REC-003", numeroPersonal: "PER-103", tipoRecurso: "QA", numeroProyecto: "PRJ-203" },
      { id: 4, numeroRecurso: "REC-004", numeroPersonal: "PER-104", tipoRecurso: "DevOps", numeroProyecto: "PRJ-204" },
      { id: 5, numeroRecurso: "REC-005", numeroPersonal: "PER-105", tipoRecurso: "PM", numeroProyecto: "PRJ-205" },
      { id: 6, numeroRecurso: "REC-006", numeroPersonal: "PER-106", tipoRecurso: "Consultor", numeroProyecto: "PRJ-206" },
    ];

    return mock;
  }

};