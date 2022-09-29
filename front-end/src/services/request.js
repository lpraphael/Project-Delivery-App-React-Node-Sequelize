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

export const getAllSellers = async (token) => {
  const url = '/users/sellers';

  const { data } = await API.get(url, { headers: { Authorization: token } });

  return data;
};

export const createOrder = async (url, body, token) => {
  const { data } = await API.post(url, body, { headers: { Authorization: token } });
  return data;
};

export const getAllOrders = async (token) => {
  const url = '/sales';
  const { data } = await API.get(url, { headers: { Authorization: token } });
  return data;
};

export const adminRegister = async (url, body) => {
  const { data } = await API.post(url, body);
  return data;
};

export const getOrdersById = async (token, id) => {
  const url = `/sales/${id}`;
  const { data } = await API.get(url, { headers: { Authorization: token } });
  return data;
};

export const handlePrepareCheck = async (token, idOrder) => {
  const dispatch = { status: 'Preparando' };
  await API.patch(`/sales/${idOrder}`, dispatch, { headers: { Authorization: token } });
};

export const handleDispatchCheck = async (token, idOrder) => {
  const dispatch = { status: 'Em Trânsito' };
  await API.patch(`/sales/${idOrder}`, dispatch, { headers: { Authorization: token } });
};
