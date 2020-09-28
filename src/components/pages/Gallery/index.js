import React from "react";
import styles from "./gallery.module.css";
import myPhoto from "../../../assets/girl.jpg";

const Gallery = () => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
  };

  const EnhancedImage = (props) => {
    return (
      <div className={styles.imageContainer}>
        <p style={imageLoading ? { display: "block" } : { display: "none" }}>
          Loading...
        </p>
        <img
          style={imageLoading ? { display: "none" } : { display: "inline" }}
          {...props}
        />
      </div>
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
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
        <EnhancedImage src={myPhoto} alt="myPhoto" onLoad={imageLoaded} />
      </div>
      <div className={styles.bottomOffsetCover} />
    </div>
  );
};

export default Gallery;
