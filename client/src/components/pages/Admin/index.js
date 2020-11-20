import React from "react";
import styles from "./Admin.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";

const MAX_USERID_LENGTH = 30;
const MIN_USERID_LENGTH = 3;
const MIN_PWD_LENGTH = 5;
const MAX_PWD_LENGTH = 30;

const yupValidationObject = Yup.object({
  userId: Yup.string()
    .min(MIN_USERID_LENGTH, "Too short")
    .max(MAX_USERID_LENGTH, "Too long")
    .required("Enter your user ID"),
  password: Yup.string()
    .min(MIN_PWD_LENGTH, "Too short")
    .max(MAX_PWD_LENGTH, "Too long")
    .required("Enter password"),
});

const login = () => {};

const Admin = () => {
  const formik = useFormik({
    initialValues: {
      userId: "",
      password: "",
    },
    validationSchema: yupValidationObject,
    onSubmit: (values, { resetForm }) => {
      login(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <ul>
          <li>
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              name="userId"
              type="text"
              onChange={(e) => {
                if (e.target.value.length <= MAX_USERID_LENGTH + 1)
                  formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.userId}
            />
            {formik.touched.userId && formik.errors.userId ? (
              <div className={styles.errorMsg}>{formik.errors.userId}</div>
            ) : null}
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                if (e.target.value.length <= MAX_PWD_LENGTH + 1)
                  formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errorMsg}>{formik.errors.password}</div>
            ) : null}
          </li>
          <li>
            <button type="submit">Login</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Admin;
