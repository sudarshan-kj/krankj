import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className={styles.mainContainer}>
    <div className={styles.contentContainer}>
      <h1>Hello there 👋🏼</h1>
      <p>
        I'm Sudarshan KJ,
        <br />
        Web Developer and Designer
      </p>
      <Link className={styles.moreLink} to="/about">
        {">>"}
      </Link>
      {/* <p>My core is to build and create.</p> */}
      {/* <p>Believe in fulfillment through involvement.</p> */}
    </div>
  </div>
);

export default LandingPage;
