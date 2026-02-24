import axios from './axios'; // your base axios instance

const TASK_API = '/tasks'; // base route

export const getTasks = (day) => {
  const url = day ? `${TASK_API}?day=${day}` : TASK_API;
  return axios.get(url);
};

export const createTask = (taskData) => {
  return axios.post(TASK_API, taskData);
};

export const updateTask = (id, taskData) => {
  return axios.put(`${TASK_API}/${id}`, taskData);
};

export const toggleTask = (id) => {
  return axios.patch(`${TASK_API}/${id}/toggle`);
};

export const deleteTask = (id) => {
  return axios.delete(`${TASK_API}/${id}`);
};
