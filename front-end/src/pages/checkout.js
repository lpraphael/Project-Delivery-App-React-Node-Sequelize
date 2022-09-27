import React from 'react';
import NavBar from '../components/navBar';
import OrderList from '../components/orderList';
import ShippingDetails from '../components/shippingDetails';

export default function Checkout() {
  return (
    <>
      <NavBar />
      <OrderList />
      <ShippingDetails />
    </>
  );
}
