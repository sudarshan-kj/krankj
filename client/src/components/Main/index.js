import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0;
  padding: 0rem;
  position: relative;
  min-height: 80vh;
  animation: slideIn 1s;

  @keyframes slideIn {
    from {
      transform: translate(50px);
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Main = ({ children }) => <StyledDiv>{children}</StyledDiv>;

export default Main;
