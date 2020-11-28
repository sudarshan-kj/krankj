import React, { useRef, useState } from "react";
import Main from "./components/Main";
import Home from "./components/pages/Home";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import { GlobalStyles } from "./global/global";
import { Switch, Route, Redirect } from "react-router-dom";
import Gallery from "./components/pages/Gallery";
import About from "./components/pages/About";
import Footer from "./components/Footer";
import usePersistence from "./hooks/usePersistence";
import ScrollToTop from "react-scroll-up";
import { ReactComponent as UpArrow } from "./assets/icons/left-arrow.svg";
import styled from "styled-components";
import Contact from "./components/pages/Contact";
import Admin from "./components/pages/Admin";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import UsersList from "./components/pages/Admin/UsersList";

const StyledUpArrow = styled(UpArrow)`
  fill: ${({ theme }) => theme.text};
  height: 20px;
  width: 20px;
  transform: rotate(90deg);
`;

const App = () => {
  const [userTheme, setUserTheme] = usePersistence("userTheme", "dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin/login" component={Admin} />
            <ProtectedRoute
              path="/admin/contactedUsers"
              component={UsersList}
            />
            <Redirect to="/home" />
          </Switch>
        </Main>
        <ScrollToTop showUnder={160}>
          <StyledUpArrow />
        </ScrollToTop>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
