import { axiosInstance } from "../../../api/axiosInstance";
import type { ProjectDto, ProjectForm, ProjectListResponse } from "../types/project.types";

export const projectService = {

  async getProjects(): Promise<ProjectListResponse> {
    const response = await axiosInstance.get<ProjectListResponse>("/proyectos");
    return response.data;
  },

  async getProjectById(id: number): Promise<ProjectDto> {
    const response = await axiosInstance.get<ProjectDto>(`/proyectos/${id}`);
    return response.data;
  },

  async createProject(form: ProjectForm): Promise<ProjectDto> {
    const response = await axiosInstance.post<ProjectDto>("/proyectos", form);
    return response.data;
  },

  async updateProject(id: number, form: ProjectForm): Promise<ProjectDto> {
    const response = await axiosInstance.put<ProjectDto>(`/proyectos/${id}`, form);
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await axiosInstance.delete(`/proyectos/${id}`);
  },

};