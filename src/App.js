import React from "react";
import styles from "./App.module.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <LandingPage>
        <Header />
      </LandingPage>
    </div>
  );
};

export default App;
