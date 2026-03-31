import { axiosInstance } from "../../../api/axiosInstance";
import type { PageResponse, ProjectDto, ProjectForm } from "../types/project.types";

export const projectService = {
  async getProjects(page = 0, size = 10): Promise<PageResponse<ProjectDto>> {
    const response = await axiosInstance.get<PageResponse<ProjectDto>>("/proyectos", {
      params: { page, size },
    });
    return response.data;
  },

  async createProject(form: ProjectForm): Promise<ProjectDto> {
    const payload = { ...form, usuarioModificacion: "admin" };
    const response = await axiosInstance.post<ProjectDto>("/proyectos", payload);
    return response.data;
  },

  async updateProject(id: number, form: ProjectForm): Promise<ProjectDto> {
    const payload = { ...form, usuarioModificacion: "admin" };
    const response = await axiosInstance.put<ProjectDto>(`/proyectos/${id}`, payload);
    return response.data;
  },
};