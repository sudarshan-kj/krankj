import React from "react";
import styles from "./AdminLoginForm.module.css";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const MAX_EMAIL_LENGTH = 30;
const MIN_EMAIL_LENGTH = 3;
const MIN_PWD_LENGTH = 5;
const MAX_PWD_LENGTH = 30;

const yupValidationObject = Yup.object({
  email: Yup.string()
    .min(MIN_EMAIL_LENGTH, "Too short")
    .max(MAX_EMAIL_LENGTH, "Too long")
    .required("Enter your user ID"),
  password: Yup.string()
    .min(MIN_PWD_LENGTH, "Too short")
    .max(MAX_PWD_LENGTH, "Too long")
    .required("Enter password"),
});
const AdminLoginForm = () => {
  const [loginError, setLoginError] = React.useState("");
  const history = useHistory();

  const handleLogin = (values) => {
    axios
      .post(`${API_ENDPOINT}/api/auth`, values)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("token", res.data.accessToken);
          history.push("/admin/contactedUsers");
        } else {
          throw new Error("Missing access token");
        }
      })
      .catch((err) => {
        console.log("Error i", err);
        setLoginError("Invalid user/password");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yupValidationObject,
    onSubmit: (values, { resetForm }) => {
      handleLogin(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <ul>
          <li>
            <label htmlFor="email">User ID</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={(e) => {
                if (e.target.value.length <= MAX_EMAIL_LENGTH + 1) {
                  setLoginError("");
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errorMsg}>{formik.errors.email}</div>
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
          <li className={styles.errorMsg}>{loginError}</li>
        </ul>
      </form>
    </div>
  );
};

export default AdminLoginForm;
