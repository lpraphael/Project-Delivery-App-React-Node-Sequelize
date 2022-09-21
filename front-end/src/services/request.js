import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

const requestRegister = async () => {
  const { data } = await API.post(url, body);
  return data;
};

export default requestRegister;
