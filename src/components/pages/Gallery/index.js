import React from "react";
import styles from "./gallery.module.css";
import myPhoto from "../../../assets/girl.jpg";

const Gallery = () => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const imageLoaded = () => {
    console.log("Image loaded");
    setImageLoading(false);
  };

  const EnhancedImage = (props) => {
    return (
      <>
        <p style={imageLoading ? { display: "block" } : { display: "none" }}>
          Loading...
        </p>
        <img
          style={imageLoading ? { display: "none" } : { display: "inline" }}
          {...props}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageLayout}>
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
      </div>
    </div>
  );
};

export default Gallery;
