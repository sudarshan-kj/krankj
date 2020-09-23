import React from "react";
import styles from "./App.module.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";

const App = () => {
  const [styleObj, setStyleObj] = React.useState({ backgroundColor: "black" });

  const isDarkThemeFn = (isDark) => {
    if (isDark) {
      setStyleObj({ backgroundColor: "black" });
    } else {
      setStyleObj({ backgroundColor: "white" });
    }
  };

  return (
    <div style={styleObj} className={styles.appWrapper}>
      <LandingPage>
        <Header isDarkTheme={isDarkThemeFn} />
      </LandingPage>
    </div>
  );
};

export default App;
