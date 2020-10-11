import React from "react";
import styles from "./Contact.module.css";
import { useFormik, Field } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";

const MAX_NAME_LENGTH = 35;
const MAX_EMAIL_LENGTH = 45;
const MAX_MESSAGE_LENGTH = 300;

const yupValidationObject = Yup.object({
  name: Yup.string()
    .max(MAX_NAME_LENGTH, 'Ah! That\'s too long! Try a bit shorter')
    .required('Please fill your name'),
  email:  Yup.string().max(MAX_EMAIL_LENGTH, 'That email is way too long.').email('That doesn\'t look like an email address').required('Please fill your email'),
  message: Yup.string().max(MAX_MESSAGE_LENGTH,'You have exceeded your message limit').required('Atleast a short message is required')
});

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
      message: ""
    }, validationSchema: yupValidationObject,
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
                if (e.target.value.length <= MAX_NAME_LENGTH + 1)
                formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          {formik.touched.name && formik.errors.name ? (
         <div className={styles.errorMsg}>{formik.errors.name}</div> 
       ) : null}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={ e => {
                if (e.target.value.length <= MAX_EMAIL_LENGTH + 1)
                formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
         <div className={styles.errorMsg}>{formik.errors.email}</div> 
       ) : null}
          </li>
          <li>
            <label htmlFor="message">Message</label>
            <textarea 
            name="message" 
            id="message" 
            value={formik.values.message} 
            onChange={ e => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH + 1)
                formik.handleChange(e)
              }}
            onBlur={formik.handleBlur}/>
          {formik.touched.message && formik.errors.message ? (
         <div className={styles.errorMsg}>{formik.errors.message}</div> 
       ) : null}
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
