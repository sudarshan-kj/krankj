import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
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
  );
};

export default Header;
