import React from "react";
import styles from "./Header.module.css";
import ToggleSwitch from "../commons/ToggleSwitch";
import AdminButton from "../commons/AdminButton";
import { Link } from "react-router-dom";

const Header = ({ isLightTheme }) => {
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
      <AdminButton />
      <ToggleSwitch
        isLightTheme={isLightTheme}
        style={{ marginRight: "1rem" }}
      />
    </div>
  );
};

export default Header;
