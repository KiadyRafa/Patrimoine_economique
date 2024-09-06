import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getPossessions = async () => {
  const response = await axios.get(`${API_BASE_URL}/possession`);
  return response.data;
};

export const createPossession = async (possession) => {
  const response = await axios.post(`${API_BASE_URL}/possession`, possession);
  return response.data;
};

export const updatePossession = async (libelle, updates) => {
  const response = await axios.put(`${API_BASE_URL}/possession/${libelle}`, updates);
  return response.data;
};

export const closePossession = async (libelle) => {
  const response = await axios.post(`${API_BASE_URL}/possession/${libelle}/close`);
  return response.data;
};

export const getValeurPatrimoine = async (date) => {
  const response = await axios.get(`${API_BASE_URL}/patrimoine/${date}`);
  return response.data;
};

export const getValeurPatrimoineRange = async (params) => {
  const response = await axios.post(`${API_BASE_URL}/patrimoine/range`, params);
  return response.data;
};
