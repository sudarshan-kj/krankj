import React from "react";
import axios from "axios";
import AdminForm from "./AdminForm";
import { isAuthenticated } from "../../commons/Auth";
import UsersList from "./UsersList";

const Admin = () => {
  return <>{isAuthenticated() ? <UsersList /> : <AdminForm />}</>;
};

export default Admin;
