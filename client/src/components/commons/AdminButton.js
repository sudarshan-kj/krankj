import React from "react";
import styled from "styled-components";
import UserIcon from "../../assets/icons/user.svg";
import { Link } from "react-router-dom";

const StyledAdminButton = styled(UserIcon)`
  fill: ${({ theme }) => theme.text};
  height: 20px;
  width: 20px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.8;
`;

const AdminButton = () => {
  return (
    <StyledDiv>
      <Link to="/admin">
        <StyledAdminButton />
      </Link>
    </StyledDiv>
  );
};

export default AdminButton;
