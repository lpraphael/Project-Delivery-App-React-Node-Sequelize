import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = ({ token }) => {
  API.defaults.headers.common.Authorization = token;
};

// esperando o back para confirmar se é preciso usar as {}
export const requestRegister = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export const signIn = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export const getAllDrinks = async (url) => {
  const { data } = await API.get(url);

  return data;
};

export const getAllSellers = async () => {
  const { data } = await API.get('/users/sellers');

  return data;
};
