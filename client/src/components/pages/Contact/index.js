import React from "react";
import styles from "./Contact.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants";
import AnimatedTick from "../../../utils/AnimatedTick";

const submitReducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_SUCCESS":
      return {
        message: action.payload,
        success: true,
        failure: false,
      };
    case "SUBMIT_TOO_MANY_REQUESTS":
      return {
        message: action.payload,
        success: false,
        failure: true,
      };
    case "SUBMIT_ERROR":
      return {
        message: action.payload,
        success: false,
        failure: true,
      };
    case "SUBMIT_PENDING":
      return { message: action.payload, success: false, failure: false };
    default:
      throw new Error("Unknown action type");
  }
};

const MAX_NAME_LENGTH = 35;
const MAX_EMAIL_LENGTH = 45;
const MAX_MESSAGE_LENGTH = 300;

const yupValidationObject = Yup.object({
  name: Yup.string()
    .max(MAX_NAME_LENGTH, "Ah! That's too long! Try a bit shorter")
    .required("Please fill your name"),
  email: Yup.string()
    .max(MAX_EMAIL_LENGTH, "That email is way too long.")
    .email("That doesn't look like an email address")
    .required("Please fill your email"),
  message: Yup.string()
    .max(MAX_MESSAGE_LENGTH, "You have exceeded your message limit")
    .required("Atleast a short message is required"),
});

const Contact = () => {
  const [submit, dispatchSubmit] = React.useReducer(submitReducer, {
    message: "",
    submitSuccess: false,
    submitFailure: false,
  });
  const postData = (values) => {
    dispatchSubmit({ type: "SUBMIT_PENDING", payload: "Submitting.." });
    setTimeout(() => {
      axios
        .post(`${API_ENDPOINT}/api/contact/submit`, values)
        .then((res) => {
          dispatchSubmit({ type: "SUBMIT_SUCCESS", payload: res.data.msg });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 429) {
              dispatchSubmit({
                type: "SUBMIT_TOO_MANY_REQUESTS",
                payload: err.response.data.error,
              });
            } else {
              dispatchSubmit({
                type: "SUBMIT_ERROR",
                payload:
                  "Something went wrong. Your response was not submitted",
              });
            }
          } else {
            dispatchSubmit({
              type: "SUBMIT_ERROR",
              payload: "Something went wrong. Your response was not submitted",
            });
          }
          console.log(
            "Error occurred while submitting the form data",
            err.response
          );
        });
    }, 300);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: yupValidationObject,
    onSubmit: (values, { resetForm }) => {
      postData(values);
      resetForm({ values: "" });
    },
  });

  return (
    <div className={styles.mainContainer}>
      {!submit.success && !submit.failure && (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <ul>
            <li>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  if (e.target.value.length <= MAX_NAME_LENGTH + 1)
                    formik.handleChange(e);
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
                onChange={(e) => {
                  if (e.target.value.length <= MAX_EMAIL_LENGTH + 1)
                    formik.handleChange(e);
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
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH + 1)
                    formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className={styles.errorMsg}>{formik.errors.message}</div>
              ) : null}
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </form>
      )}
      {submit.success && (
        <div>
          <AnimatedTick />
        </div>
      )}
      {submit.failure && (
        <div>
          <h3>Oh snap!</h3>
        </div>
      )}
      <p>{submit.message}</p>
    </div>
  );
};

export default Contact;
