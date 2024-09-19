import api from "../lib/api";
// Get the users from the API
export const getUsers = () => api.get("/users");
// Get the user content from the API   
export const getUserContent = (userId) => api.get(`/content/${userId}`);
// Approve the content for a specific user
export const approveContent = (userId, contentId) => api.post(`/content/${userId}/approve/${contentId}`);
// Reject the content for a specific user
export const rejectContent = (userId, contentId) => api.post(`/content/${userId}/reject/${contentId}`);