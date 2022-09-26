import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
    console.log(user.name);
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
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        className="orders-icon"
        type="button"
        onClick={ () => { navigate('/customer/orders'); } }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <h2
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </h2>
      <button
        className="logOut-icon"
        type="submit"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        SAIR
      </button>
    </header>
  );
}
