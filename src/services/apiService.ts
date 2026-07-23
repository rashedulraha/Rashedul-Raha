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

// Blog API Calls
export const getBlogs = async () => {
  return apiClient.get("/blogs");
};

export const getBlogBySlug = async (slug: string) => {
  return apiClient.get(`/blogs/${slug}`);
};

export const createBlog = async (data: any) => {
  return apiClient.post("/blogs", data);
};

export const updateBlog = async (id: string, data: any) => {
  return apiClient.patch(`/blogs/${id}`, data);
};

export const deleteBlog = async (id: string) => {
  return apiClient.delete(`/blogs/${id}`);
};

// Certificate API Calls
export const getCertificates = async () => {
  return apiClient.get("/certificates");
};

export const createCertificate = async (data: any) => {
  return apiClient.post("/certificates", data);
};

export const deleteCertificate = async (id: string) => {
  return apiClient.delete(`/certificates/${id}`);
};

// Guestbook API Calls
export const getGuestbookMessages = async () => {
  return apiClient.get("/guestbook");
};

export const createGuestbookMessage = async (data: any) => {
  return apiClient.post("/guestbook", data);
};

export const deleteGuestbookMessage = async (id: string) => {
  return apiClient.delete(`/guestbook/${id}`);
};

// Bucket List API Calls
export const getBucketList = async () => {
  return apiClient.get("/bucket-list");
};

export const createBucketListItem = async (data: any) => {
  return apiClient.post("/bucket-list", data);
};

export const updateBucketListItem = async (id: string, data: any) => {
  return apiClient.patch(`/bucket-list/${id}`, data);
};

export const deleteBucketListItem = async (id: string) => {
  return apiClient.delete(`/bucket-list/${id}`);
};

// Contact Messages API Calls
export const sendContactMessage = async (data: any) => {
  return apiClient.post("/contact-messages", data);
};

export const getContactMessages = async () => {
  return apiClient.get("/contact-messages");
};

export const markContactMessageRead = async (id: string) => {
  return apiClient.patch(`/contact-messages/${id}/read`);
};

export const deleteContactMessage = async (id: string) => {
  return apiClient.delete(`/contact-messages/${id}`);
};

// Testimonials API Calls
export const getTestimonials = async () => {
  return apiClient.get("/testimonials");
};

export const createTestimonial = async (data: any) => {
  return apiClient.post("/testimonials", data);
};

export const updateTestimonial = async (id: string, data: any) => {
  return apiClient.patch(`/testimonials/${id}`, data);
};

export const deleteTestimonial = async (id: string) => {
  return apiClient.delete(`/testimonials/${id}`);
};
