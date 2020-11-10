import React, { useContext } from "react";
import styles from "./ToggleSwitch.module.css";
import { ThemeContext } from "styled-components";

const ToggleSwitch = ({ isLightTheme, style }) => {
  const themeContext = useContext(ThemeContext);
  const [checked, setChecked] = React.useState(themeContext.isLight);

  React.useEffect(() => {
    isLightTheme(checked);
  }, [checked, isLightTheme]);

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
