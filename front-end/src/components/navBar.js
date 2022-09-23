import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const userName = localStorage.getItem('name');
    setName(userName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <button
        className="product-icon"
        type="button"
        onClick={ () => { navigate('/customer/products'); } }
        data-testId="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        className="orders-icon"
        type="button"
        onClick={ () => { navigate('/customer/orders'); } }
        data-testId="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <h2
        data-testId="customer_products__element-navbar-user-full-name"
      >
        { name }
      </h2>
      <button
        className="logOut-icon"
        type="submit"
        onClick={ handleLogout }
        data-testId="customer_products__element-navbar-link-logout"
      >
        SAIR
      </button>
    </header>
  );
}
