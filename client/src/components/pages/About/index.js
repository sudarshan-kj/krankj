import React from "react";
import axios from "axios";
import styles from "./AboutPage.module.css";

const About = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <p>About me</p>
      </div>
    </div>
  );
};

export default About;
