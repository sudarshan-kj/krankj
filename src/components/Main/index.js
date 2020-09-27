import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0;
  padding: 0rem;
  height: 80vh;
`;

const Main = ({ children }) => <StyledDiv>{children}</StyledDiv>;

export default Main;
