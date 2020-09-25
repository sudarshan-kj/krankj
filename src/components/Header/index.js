import React from "react";
import styles from "./Header.module.css";
import ToggleSwitch from "../commons/ToggleSwitch";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Header = ({ isDarkTheme }) => {
  const handleNavModal = () => {
    console.log("Clicked me");
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div
          className={styles.dropDownButtonContainer}
          onClick={handleNavModal}
        >
          Icon
        </div>
      </nav>

      <div className={styles.dummyContainer} />
      <ToggleSwitch isDarkTheme={isDarkTheme} style={{ marginRight: "1rem" }} />
    </div>
  );
};

export default Header;
