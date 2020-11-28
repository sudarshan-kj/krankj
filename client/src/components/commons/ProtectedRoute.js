import React from "react";
import { isAuthenticated } from "../../utils/Auth";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component }) => {
  const isAuth = isAuthenticated();
  return isAuth ? (
    <Route to={path} component={component} />
  ) : (
    <Redirect to="/admin/login" />
  );
};

export default ProtectedRoute;
