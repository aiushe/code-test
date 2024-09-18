import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/users/${userId}/content`);
