import React from "react";
import styles from "./gallery.module.css";
import styled from "styled-components";
import { css } from "@emotion/core";
import Loader from "react-spinners/PulseLoader";
import { API_ENDPOINT } from "../../../constants";
import axios from "axios";

let imageCount = 9;

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
  const [serverImages, setServerImages] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(true);
  const [serverResponse, setServerResponse] = React.useState("");

  const imageLoaded = () => {
    if (--imageCount === 0) {
      setImageLoading(false);
      imageCount = 9;
    }
  };

  const fetchImages = () => {
    axios
      .get(`${API_ENDPOINT}/images?limit=11`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Api responded with an error");
        }
        return response.data.images;
      })
      .then((responseArray) => setServerImages(responseArray))
      .catch((err) => console.log("Request failed with error", err));
  };

  const imgRef = React.useRef();

  function callServer() {
    fetchImages();
    axios
      .get(`${API_ENDPOINT}/api/gallery`)
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
        {serverImages.map((image, index) => {
          return (
            <EnhancedImage
              key={index}
              src={`${API_ENDPOINT}${image.path}`}
              alt="Image"
              onLoad={imageLoaded}
            />
          );
        })}
      </div>
      <p
        style={!imageLoading ? { display: "block" } : { display: "none" }}
      >{`Response from server is: ${serverResponse}`}</p>
      <BottomOffsetCover />
    </div>
  );
};

export default Gallery;
