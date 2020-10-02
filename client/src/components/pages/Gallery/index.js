import React from "react";
import styles from "./gallery.module.css";
import styled from "styled-components";
import { css } from "@emotion/core";
import Loader from "react-spinners/PulseLoader";
import images from "../../../assets/images";
import { API_ENDPOINT } from "../../../constants";
import axios from "axios";

const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const BottomOffsetCover = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: ${({ theme }) => theme.body};
`;

const Gallery = () => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [serverResponse, setServerResponse] = React.useState("");

  const imageLoaded = () => {
    setImageLoading(false);
  };

  const imgRef = React.useRef();

  function callServer() {
    axios
      .get(`${API_ENDPOINT}/api/testAPI`)
      .then((res) => {
        setServerResponse(res.data.key);
      })
      .catch((err) => setServerResponse("<Error loading data>"));
  }

  React.useEffect(() => {
    callServer();
  }, []);

  React.useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [imgRef]);

  const EnhancedImage = (props) => {
    return (
      <div className={styles.imageContainer}>
        <Loader
          className={styles.loader}
          css={override}
          color={"#a1a1a1"}
          loading={imageLoading}
        />
        <img
          ref={imgRef}
          style={imageLoading ? { display: "none" } : { display: "inline" }}
          {...props}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageLayout}>
        {images.map((image) => {
          return (
            <EnhancedImage
              key={image.default}
              src={image.default}
              alt="Image"
              onLoad={imageLoaded}
            />
          );
        })}
      </div>
      <p>{`Response from server is: ${serverResponse}`}</p>
      <BottomOffsetCover />
    </div>
  );
};

export default Gallery;
