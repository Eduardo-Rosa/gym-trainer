import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/exercises'
});

export const getExercise = (id: string) => api.get(`/${id}`);
export const generateInstructions = (id: string) => api.post(`/${id}/generate`);

export default api;
