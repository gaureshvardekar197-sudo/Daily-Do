// import api from "./axios";

// // Admin Dashboard
// export const getAdminDashboard = () =>
//   api.get("/admin/dashboard");

// // Get all users
// export const getAllUsers = () =>
//   api.get("/admin/users");

// // Block / Unblock user
// export const toggleUserStatus = (id) =>
//   api.post(`/admin/user/status/${id}`);

// // Change role
// export const updateUserRole = (id, role) =>
//   api.post(`/admin/user/role/${id}`, { role });

// // Get all tasks
// export const getAllTasks = () =>
//   api.get("/admin/tasks");

// // Daily stats
// export const getDailyStats = () =>
//   api.get("/admin/stats");


import api from "./axios";

// Admin Dashboard
export const getAdminDashboard = () =>
  api.get("/admin/dashboard");

// Get all users
export const getAllUsers = () =>
  api.get("/admin/users");

// Block / Unblock user
export const toggleUserStatus = (id) =>
  api.post(`/admin/user/status/${id}`);

// Change role
export const updateUserRole = (id, role) =>
  api.post(`/admin/user/role/${id}`, { role });

// Get all tasks
export const getAllTasks = () =>
  api.get("/admin/tasks");

// Get tasks for a specific user (admin only)
export const getUserTasks = (userId) =>
  api.get(`/admin/tasks/user/${userId}`);

// Admin creates task for a user
export const createTaskForUser = (userId, taskData) =>
  api.post(`/admin/tasks/user/${userId}/create`, taskData);

// Admin toggles any task
export const adminToggleTask = (taskId) =>
  api.patch(`/admin/tasks/${taskId}/toggle`);

// Admin deletes any task
export const adminDeleteTask = (taskId) =>
  api.delete(`/admin/tasks/${taskId}`);

// Daily stats
export const getDailyStats = () =>
  api.get("/admin/stats");