import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component }) => {
  const isAuthenticated = localStorage.getItem("auth");
  return isAuthenticated ? (
    <Route to={path} component={component} />
  ) : (
    <Redirect to="/adminLogin" />
  );
};

export default ProtectedRoute;
