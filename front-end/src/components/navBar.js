import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setName(user.name);
    console.log(user.name);

    const { role } = user;
    try {
      switch (role) {
      case 'customer':
        setIsCustomer(true);
        break;
      case 'seller':
        setIsSeller(true);
        break;
      case 'administrator':
        setIsAdmin(true);
        break;
      default:
        break;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  function customerNavBar() {
    return (
      <>
        <Link
          className="product-icon"
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          className="orders-icon"
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      </>
    );
  }

  function sellerNavBar() {
    return (
      <Link
        className="orders-icon"
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </Link>
    );
  }

  function adminNavBar() {
    return (
      <Link
        className="orders-icon"
        to="/admin/manage"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Gerenciar usuários
      </Link>
    );
  }

  return (
    <header>
      { isCustomer && customerNavBar() }
      { isSeller && sellerNavBar() }
      { isAdmin && adminNavBar() }
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
