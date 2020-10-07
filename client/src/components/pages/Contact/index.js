import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea />
        </label>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
