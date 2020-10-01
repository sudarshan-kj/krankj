import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 1rem;
  font-size: 0.5rem;
  height: 10vh;

  @media screen and (min-width: 960px) {
    div {
      margin: 0rem 3rem;
    }
  }
`;

const Footer = () => <StyledDiv>&copy; All Rights Reserved</StyledDiv>;

export default Footer;
