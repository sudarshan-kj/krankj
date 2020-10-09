import React from "react";
import styles from "./Contact.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";


const validate = values => {
  const errors = {};
  if(!values.name){
    errors.name = "Name is required"
  } else if(values.name.length > 25){
    errors.name = "Use a shorter name"
  }
  
  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if(values.email.length > 35){
    errors.email = "Use a shorter email address"
  }

  return errors;
};

const Contact = () => {
  const postData = (values) => {
    axios
      .post(`${API_ENDPOINT}/api/contact/submit`, values)
      .then((res) => console.log(res.data.msg))
      .catch((err) =>
        console.log("Error occurred while submittin the form data", err)
      );
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },validate,
    onSubmit: (values, { resetForm }) => {
      postData(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={ e => {
                if (e.target.value.length <= 26)
                formik.handleChange(e)
              }}
              value={formik.values.name}
            />
            {formik.errors.name ? <div className={styles.errorMsg}>{formik.errors.name}</div> : null}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={ e => {
                if (e.target.value.length <= 36)
                formik.handleChange(e)
              }}
              value={formik.values.email}
            />
            {formik.errors.email ? <div className={styles.errorMsg}>{formik.errors.email}</div> : null}
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Contact;
