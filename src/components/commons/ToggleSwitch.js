import React from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ isDarkTheme, style }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    isDarkTheme(checked);
  }, [checked]);

  const toggleCheckedSwitch = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div style={style} className={styles.container}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleCheckedSwitch}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
