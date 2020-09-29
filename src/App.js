import React, { useRef } from "react";
import Main from "./components/Main";
import Home from "./components/pages/Home";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import { GlobalStyles } from "./global/global";
import { Switch, Route } from "react-router-dom";
import Gallery from "./components/pages/Gallery";
import Footer from "./components/Footer";
import usePersistence from "./hooks/usePersistence";

const App = () => {
  const [userTheme, setUserTheme] = usePersistence("userTheme", "dark");

  const isFirstRun = useRef(true);
  const isLightTheme = (isLight) => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (isLight) setUserTheme("light");
    else setUserTheme("dark");
  };

  return (
    <ThemeProvider theme={userTheme === "light" ? lightTheme : darkTheme}>
      <div className="appWrapper">
        <GlobalStyles />
        <Header isLightTheme={isLightTheme} />
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/gallery">
              <Gallery />
            </Route>
          </Switch>
        </Main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
