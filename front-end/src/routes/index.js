import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import SellerOrder from '../pages/sellerOrders';
import Products from '../pages/products';
import Admin from '../pages/admin';
import Checkout from '../pages/checkout';
import CustomerOrder from '../pages/customerOrders';
import OrderDetails from '../pages/orderDetails';
import Home from '../components/home';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/register"
        element={ <Register /> }
      />
      <Route
        exact
        path="/customer/products"
        element={ <Products /> }
      />
      <Route
        exact
        path="/customer/checkout"
        element={ <Checkout /> }
      />
      <Route
        exact
        path="/customer/orders/:id"
        element={ <OrderDetails /> }
      />
      <Route
        exact
        path="/customer/orders/"
        element={ <CustomerOrder /> }
      />
      <Route
        exact
        path="/login"
        element={ <Login /> }
      />
      <Route
        exact
        path="/seller/orders"
        element={ <SellerOrder /> }
      />
      <Route
        exact
        path="/admin/manage"
        element={ <Admin /> }
      />
      <Route
        exact
        path="/"
        element={ <Home /> }
      />
    </Switch>
  );
}

export default Routes;
