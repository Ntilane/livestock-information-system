import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = (credentials) => axios.post(`${API_URL}/api/auth/login`, credentials);
export const getSheepByOwner = (owner_id) => axios.get(`${API_URL}api/users/sheep/${owner_id}`);
export const updateSheep = (owner_id, data) => axios.put(`${API_URL}api/animals/sheep/${owner_id}`, data);
export const register = (data) => axios.post(`${API_URL}/api/auth/register`, data);
