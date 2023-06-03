import React from "react";
import ava from "assets/icon/ava.jpg";
import { S } from "common/componentsBIG/Form_styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const goToLogin = useAppSelector((state) => state.auth.goToLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOuthandler = () => {
    dispatch(authThunks.logout());
  };

  if (goToLogin) {
    navigate("/login");
  }

  return (
    <S.Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <S.FormWrapper>
          <h2 style={{ fontFamily: "Montserrat" }}>Personal Information</h2>

          <AvatarWrapper>
            <Avatar alt="Remy Sharp" src={ava} sx={{ width: 124, height: 124 }} />
          </AvatarWrapper>

          <S.TipicalWrapper>
            <S.OpacitySpan>{profile!.name}</S.OpacitySpan>
          </S.TipicalWrapper>

          <div>
            <S.OpacitySpan>{profile!.email}</S.OpacitySpan>
          </div>

          <S.TipicalWrapper>
            <ButtonComponent buttonName={"Log out"} callback={logOuthandler} disabled={false} />
          </S.TipicalWrapper>

          <S.TipicalWrapper>
            <span>Did you remember your password?</span>
          </S.TipicalWrapper>

          <S.DontHaveAccount>
            <Link to={"/login"}>Try logging in</Link>
          </S.DontHaveAccount>
        </S.FormWrapper>
      </Paper>
    </S.Wrapper>
  );
};

const AvatarWrapper = styled.span`
  display: flex;
  justify-content: center;
  //margin-bottom: 30px;
`;
