import React from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/login"
        element={ <Login /> }
      />
      <Route
        exact
        path="/register"
        element={ <Register /> }
      />
      <Route
        path="/"
        element={ <Navigate to="/login" replace /> }
      />
    </Switch>
  );
}

export default Routes;
