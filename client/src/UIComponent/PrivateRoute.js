import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    render={props =>
      isAuthenticated === true ? <Component {...rest} /> : <Redirect to="/" />}
  />
);

export default PrivateRoute;
