import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

const requestRegister = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export const signIn = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export default requestRegister;
