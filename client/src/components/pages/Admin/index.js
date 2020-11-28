import React from "react";
import AdminLoginForm from "./AdminLoginForm";
import { isAuthenticated } from "../../../utils/Auth";
import { useHistory } from "react-router-dom";

const Admin = () => {
  const history = useHistory();
  if (isAuthenticated()) {
    history.push("/admin/contactedUsers");
  }
  return (
    <>
      <AdminLoginForm />
    </>
  );
};

export default Admin;
