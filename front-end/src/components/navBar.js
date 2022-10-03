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
      <div
        className="w-[260px] p-[10px]
      items-center m-[10px] flex justify-between"
      >
        <Link
          className="product-icon text-nord-light-3
           text-[20px] hover:border-b-2 h-[40px] w-[20px] hover:border-nord-aurora-1"
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          className="orders-icon text-nord-light-3 text-[20px]
          hover:border-b-2 h-[40px] hover:border-nord-aurora-1"
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      </div>
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
        className="orders-icon text-nord-light-3"
        to="/admin/manage"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Gerenciar usuários
      </Link>
    );
  }

  return (
    <header
      className=" flex
      text-nord-light-3 p-[10px] justify-between items-center w-[800px]"
    >
      { isCustomer && customerNavBar() }
      { isSeller && sellerNavBar() }
      { isAdmin && adminNavBar() }
      <div className="flex justify-between w-[180px] h-[20px] items-center">
        <h2
          className="text-[18px]"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </h2>
        <button
          className="orders-icon text-nord-light-3 text-[18px]
          hover:border-b-2 h-[40px] hover:border-nord-aurora-1"
          type="button"
          onClick={ handleLogout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          SAIR
        </button>
      </div>
    </header>
  );
}
