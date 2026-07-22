import apiClient from "@/lib/axios";

// Project API Calls
export const getProjects = async () => {
  return apiClient.get("/projects");
};

export const getProjectById = async (id: string) => {
  return apiClient.get(`/projects/${id}`);
};

export const createProject = async (data: any) => {
  return apiClient.post("/projects", data);
};

export const updateProject = async (id: string, data: any) => {
  return apiClient.patch(`/projects/${id}`, data);
};

export const deleteProject = async (id: string) => {
  return apiClient.delete(`/projects/${id}`);
};

// Skill API Calls
export const getSkills = async () => {
  return apiClient.get("/skills");
};

export const createSkill = async (data: any) => {
  return apiClient.post("/skills", data);
};

export const updateSkill = async (id: string, data: any) => {
  return apiClient.patch(`/skills/${id}`, data);
};

export const deleteSkill = async (id: string) => {
  return apiClient.delete(`/skills/${id}`);
};
