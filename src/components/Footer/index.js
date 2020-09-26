import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 3rem;
  font-size: 0.5rem;
  height: 10vh;
`;

const Footer = () => <StyledDiv>&copy; All Rights Reserved</StyledDiv>;

export default Footer;
