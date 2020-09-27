import React from "react";
import styles from "./gallery.module.css";
import myPhoto from "../../../assets/girl.jpg";

const Gallery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageLayout}>
        <img src={myPhoto} alt="myPhoto" />
        <img src={myPhoto} alt="myPhoto" />
        <img src={myPhoto} alt="myPhoto" />
        <img src={myPhoto} alt="myPhoto" />
        <img src={myPhoto} alt="myPhoto" />
        <img src={myPhoto} alt="myPhoto" />
      </div>
    </div>
  );
};

export default Gallery;
