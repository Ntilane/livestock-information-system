import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = (credentials) => axios.post(`${API_URL}/api/auth/login`, credentials);
export const getSheepByOwner = (national_id) => axios.get(`${API_URL}api/users/sheep/${national_id}`);
export const updateSheep = (national_id, data) => axios.put(`${API_URL}api/animals/sheep/${national_id}`, data);
export const register = (data) => axios.post(`${API_URL}/api/auth/register`, data);
export const addSheep = (data) => axios.post(`${API_URL}/api/animals/addsheeps`, data);
export const deleteSheep = (national_id) => axios.delete(`${API_URL}/api/animals/deleteSheeps/${national_id}`);



