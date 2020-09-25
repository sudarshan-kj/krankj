import React from "react";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import { GlobalStyles } from "./global/global";
import { Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";

const App = () => {
  const [theme, setTheme] = React.useState("dark");

  const isFirstRun = React.useRef(true);
  const isDarkTheme = (isLight) => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (isLight) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="appWrapper">
        <GlobalStyles />
        <Header isDarkTheme={isDarkTheme} />
        <Switch>
          <Route path="/home">
            <LandingPage />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
