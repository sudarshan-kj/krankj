import React from "react";
import AdminForm from "./AdminForm";
import { isAuthenticated } from "../../../utils/Auth";
import UsersList from "./UsersList";

const Admin = () => {
  return <>{!isAuthenticated() ? <AdminForm /> : <UsersList />}</>;
};

export default Admin;
