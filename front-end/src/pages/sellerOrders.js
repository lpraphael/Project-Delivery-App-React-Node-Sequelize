import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import OrderContainer from '../components/ordersContainer';
import { getSellerOrders } from '../services/request';

function SellerOrder() {
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSales = async () => {
      const result = await getSellerOrders(user.token);
      setSales(result);
    };
    fetchSales();
  }, [user.token]);

  return (
    <>
      <NavBar />
      { sales && sales.map((sale) => (
        <OrderContainer key={ sale.id } sale={ sale } />
      ))}
    </>
  );
}

export default SellerOrder;
