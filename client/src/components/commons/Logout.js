import React from "react";
import { logout } from "../../utils/Auth";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  background-color: #db6505;
  border: none;
  color: white;
  padding: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  margin: 10px 0;
  &:hover {
    cursor: pointer;
    background-color: #a8530e;
  }
`;

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/adminLogin");
  };

  return (
    <ButtonContainer>
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </ButtonContainer>
  );
};

export default Logout;
