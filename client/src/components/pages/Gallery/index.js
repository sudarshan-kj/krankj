import React from "react";
import styles from "./gallery.module.css";
import styled from "styled-components";
import { css } from "@emotion/core";
import Loader from "react-spinners/PulseLoader";
import { API_ENDPOINT } from "../../../constants";
import axios from "axios";
let imageCount = 11;

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

const galleryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        serverImages: action.payload,
      };
    case "FETCH_COMPLETE":
      return { ...state, isLoading: false, isError: false };
    case "FETCH_FAIL":
      return { ...state, isError: true, isLoading: false };
    default:
      throw new Error("Unkown action received by gallery reducer");
  }
};

const Gallery = () => {
  const [serverImages, setServerImages] = React.useState([]);
  const [url, setUrl] = React.useState(`${API_ENDPOINT}/api/images?limit=11`);
  const [images, dispatchImages] = React.useReducer(galleryReducer, {
    serverImages: [],
    isError: false,
    isLoading: false,
  });

  const imageLoaded = () => {
    if (--imageCount === 0) {
      //dispatch({ type: "FETCH_COMPLETE" });
      imageCount = 11;
    }
  };

  const fetchImages = () => {
    dispatchImages({ type: "FETCH_INIT" });
    setTimeout(
      () =>
        axios
          .get(url)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Api responded with an error");
            }
            return response.data.images;
          })
          .then((responseArray) =>
            dispatchImages({
              type: "FETCH_DATA_SUCCESS",
              payload: responseArray,
            })
          )
          .catch((err) => {
            console.log("Request failed with error", err);
            dispatchImages({ type: "FETCH_FAIL" });
          }),
      2000
    );
  };

  const imgRef = React.useRef();

  React.useEffect(() => {
    fetchImages();
  }, [url]);

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
          loading={images.isLoading}
        />
        <img
          ref={imgRef}
          style={images.isLoading ? { display: "none" } : { display: "inline" }}
          {...props}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageLayout}>
        {images.serverImages.map((image, index) => {
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
      <BottomOffsetCover />
      {images.isError && <p>Something went wrong..</p>}
    </div>
  );
};

export default Gallery;
