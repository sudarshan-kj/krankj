import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import myImage from "../../../assets/images/myimg.jpg";

const HomePage = () => (
  <div className={styles.mainContainer}>
    <div className={styles.contentContainer}>
      <section className={styles.introSection}>
        <h1>Hello there 👋🏼</h1>
        <p>
          I'm Sudarshan KJ,
          <br />
          Web Developer and Designer
        </p>
        <Link className={styles.moreLink} to="/about">
          {">>"}
        </Link>
      </section>
      <section className={styles.profilePictureSection}>
        <img
          className={styles.profilePicutreImg}
          src={myImage}
          alt="sudarshan"
        />
      </section>
    </div>
  </div>
);

export default HomePage;
