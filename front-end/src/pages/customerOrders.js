import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import OrderContainer from '../components/ordersContainer';
import { getAllOrders } from '../services/request';

export default function CustomerOrder() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getAllOrders(user.token);
      setOrders(result);
    };
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      { orders && orders.map((sale) => (
        <OrderContainer key={ sale.id } sale={ sale } />
      ))}
    </>
  );
}
