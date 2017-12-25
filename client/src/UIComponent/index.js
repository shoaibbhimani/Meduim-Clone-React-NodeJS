import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    render={props =>
      isAuthenticated === true ? (
        <Component {...rest} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
