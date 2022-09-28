import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  if (!user) return <Navigate to="/login" />;

  if (user.role === 'customer') return <Navigate to="/customer/products" />;

  if (user.role === 'seller') return <Navigate to="/seller/orders" />;

  if (user.role === 'administrator') return <Navigate to="/admin/manage" />;
}
