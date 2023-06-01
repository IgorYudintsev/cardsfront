import React from "react";
import incubaIcon from "assets/icon/incubaIcon.jpg";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";

type PropsType = {
  disabled?: boolean;
};

export const Header: React.FC<PropsType> = (props) => {
  const { disabled = false } = props;
  const navigate = useNavigate();

  const goToRegisterHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <Wrapper>
        <Icon>
          <img src={incubaIcon} alt="incubaIcon" />
        </Icon>
        <ButtonCase>
          <ButtonComponent buttonName={"Sign up"} callback={goToRegisterHandler} disabled={disabled} />
        </ButtonCase>
      </Wrapper>
      <LineWithShadow />
    </>
  );
};

const Wrapper = styled.span`
  height: 60px;
  display: flex;
  justify-content: space-around;
`;

const ButtonCase = styled.span`
  height: 60px;

  & > button {
    margin-top: 10px;
  }
`;

const Icon = styled.span`
  & > img {
    width: 250px;
  }
`;

const LineWithShadow = styled.div`
  border-bottom: 1px solid #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
`;
