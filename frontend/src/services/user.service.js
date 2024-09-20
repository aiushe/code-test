import api from "../lib/api";
// Get the users from the API
export const getUsers = () => api.get("/users");
// Get the user content from the API   
export const getUserContent = (userId) => api.get(`/content/${userId}`);
// Approve the content for a specific user
export const approveContent = (userId, contentId) => {
  console.log(`Approving content - userId: ${userId}, contentId: ${contentId}`);
  return api.patch(`/content/${contentId}/status`, { status: 'approved' });
};
// Reject the content for a specific user
export const rejectContent = (contentId) => api.patch(`/content/${contentId}/status`, { status: 'rejected' });
