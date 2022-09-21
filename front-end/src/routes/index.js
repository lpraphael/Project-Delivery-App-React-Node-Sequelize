import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Login from '../pages/login';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        element={ <Login /> }
      />
    </Switch>
  );
}

export default Routes;
