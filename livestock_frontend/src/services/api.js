import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const getSheepByOwner = (ownerId) => axios.get(`${API_URL}/sheep/${owner_id}`);
export const updateSheep = (ownerId, data) => axios.put(`${API_URL}/sheep/${owner_id}`, data);
// Add more as needed
