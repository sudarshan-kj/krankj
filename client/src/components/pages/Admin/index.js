import React from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";
import AdminForm from "./Form";

const login = (values) => {
  axios
    .post(`${API_ENDPOINT}/api/auth`, values)
    .then((res) => console.log("Response is", res))
    .catch((err) => console.log("Error occured while logging the user in"));
};

const Admin = () => {
  return (
    <>
      <AdminForm handleLogin={login} />
    </>
  );
};

export default Admin;
