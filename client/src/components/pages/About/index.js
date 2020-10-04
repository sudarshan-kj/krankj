import React from "react";
import axios from "axios";
import styles from "./AboutPage.module.css";

const About = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <h1>About me</h1>
        <ul>
          <li>
            <p>My core is to build and create. 🔨</p>
          </li>
          <li>
            <p>Strongly believe in fulfillment through involvement. 🙋‍♂️</p>
          </li>
          <li>
            <p>Be honest. First to yourself, then to others. 🙂</p>
          </li>
          <li>
            <p>Be alive when alive. You got no option when dead. 🕺</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
