import React from "react";
import styles from "./App.module.css";
import LandingPage from "./components/LandingPage";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <LandingPage />
    </div>
  );
};

export default App;
