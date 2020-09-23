import React from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ style }) => {
  return (
    <div style={style} className={styles.container}>
      Toggle Me
    </div>
  );
};

export default ToggleSwitch;
