import React from "react";
import ava from "assets/icon/ava.jpg";
import { S } from "common/componentsBIG/Form_styles";
import Paper from "@mui/material/Paper";
import { TextInput } from "common/componentsSmall/TextInput";
import { ButtonComponentForm } from "common/componentsSmall/ButtonComponentForm";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import { useAppSelector } from "app/hooks";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
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
            <ButtonComponent buttonName={"Log out"} callback={() => {}} disabled={false} />
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
