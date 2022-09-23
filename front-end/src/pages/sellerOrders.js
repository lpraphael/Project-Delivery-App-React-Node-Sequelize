import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import OrderContainer from '../components/ordersContainer';
import { API } from '../services/request';

function SellerOrder() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    API.get('/seller/orders').then((response) => { setSales(response.data); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      { sales && sales.map((sale, index) => (
        <OrderContainer key={ index } sale={ sale } />
      ))}
    </>
  );
}

export default SellerOrder;
