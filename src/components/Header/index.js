import React from "react";
import styles from "./Header.module.css";
import ToggleSwitch from "../commons/ToggleSwitch";

const Header = ({ isDarkTheme }) => {
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>
            <a href="#">Gallery</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div className={styles.dummyContainer} />
      <ToggleSwitch isDarkTheme={isDarkTheme} style={{ marginRight: "1rem" }} />
    </div>
  );
};

export default Header;
