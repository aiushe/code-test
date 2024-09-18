import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/users/${userId}/content`);

//approve content
export const approveContent = (userId, contentId) => 
api.post(`/users/${userId}/content/${contentId}/approve`);
  
//reject content
export const rejectContent = (userId, contentId) => 
api.post(`/users/${userId}/content/${contentId}/reject`);