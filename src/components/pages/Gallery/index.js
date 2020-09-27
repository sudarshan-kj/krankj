import React from "react";
import styles from "./gallery.module.css";
import myPhoto from "../../../assets/girl.jpg";

const Gallery = () => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
  };

  const Image = () => {
    return (
      <>
        <p style={imageLoading ? { display: "block" } : { display: "none" }}>
          Loading...
        </p>
        <img
          style={imageLoading ? { display: "none" } : { display: "inline" }}
          src={myPhoto}
          alt="myPhoto"
          onLoad={imageLoaded}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageLayout}>
        <Image />
        <Image />
        <Image />
        <Image />
        <Image />
        <Image />
      </div>
    </div>
  );
};

export default Gallery;
