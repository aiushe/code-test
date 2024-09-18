import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/content/${userId}`);

export const approveContent = (userId, contentId) => 
  api.post(`/content/${userId}/${contentId}/approve`);

export const rejectContent = (userId, contentId) => 
  api.post(`/content/${userId}/${contentId}/reject`);