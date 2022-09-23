import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3001',
});

// esperando o back para confirmar se é preciso usar as {}
export const requestRegister = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export const signIn = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};
