import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import { GlobalStyles } from "./global/global";

const App = () => {
  const [theme, setTheme] = React.useState("light");

  const isFirstRun = React.useRef(true);
  const isDarkTheme = (isDark) => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (isDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="appWrapper">
        <GlobalStyles />
        <LandingPage>
          <Header isDarkTheme={isDarkTheme} />
        </LandingPage>
      </div>
    </ThemeProvider>
  );
};

export default App;
