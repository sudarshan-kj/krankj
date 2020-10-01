import React from "react";
import styles from "./HomePage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1>Hello there 👋🏼</h1>
        <p>
          I'm Sudarshan KJ,
          <br />
          Web Developer and Designer
        </p>
        <p>9686678568</p>
      </div>
    </div>
  );
};

export default LandingPage;
