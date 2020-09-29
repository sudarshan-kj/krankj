import React from "react";
import styles from "./gallery.module.css";
import styled from "styled-components";
import myPhoto from "../../../assets/images/girl.jpg";

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

  const BottomOffsetCover = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: ${({ theme }) => theme.body};
  `;

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
      <BottomOffsetCover />
    </div>
  );
};

export default Gallery;
