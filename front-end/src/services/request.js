import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// esperando o back para confirmar se é preciso usar as {}
export const requestRegister = async () => {
  const { data } = await API.post(url, body);
  return data;
};

export const signIn = async () => {
  const { data } = await API.post(url, body);
  return data;
};
