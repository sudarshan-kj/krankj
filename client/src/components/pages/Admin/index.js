import React from "react";
import styles from "./Admin.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";

const Admin = () => {
  return (
    <div className={styles.mainContainer}>
      <h1>Hello, I'm an admin</h1>
    </div>
  );
};

export default Admin;
