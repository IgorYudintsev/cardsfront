import React, { useState, KeyboardEvent, useRef, forwardRef } from "react";
import ava from "assets/icon/ava.jpg";
import { S } from "common/componentsBIG/Form_styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import panIcon from "assets/icon/pan.jpg";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const goToLogin = useAppSelector((state) => state.auth.goToLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  const logOuthandler = () => {
    dispatch(authThunks.logout());
  };

  const updateHandler = (textRef: string) => {
    const payload = {
      name: textRef,
      //avatar?: string;
    };
    dispatch(authThunks.updateProfile({ payload }));
  };

  const editHandler = () => {
    setEdit(!edit);
    if (textRef.current) {
      updateHandler(textRef.current.value);
    }
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      editHandler();
    }
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

          <NameWrapper>
            {edit ? (
              <TextField
                placeholder={profile ? profile.name : "user"}
                inputRef={textRef}
                variant="standard"
                onKeyPress={onKeyPressHandler}
              />
            ) : (
              <NameSpan>{profile ? profile.name : "user"} </NameSpan>
            )}
            <Icon onClick={editHandler}>
              <img src={panIcon} alt="panIcon" />
            </Icon>
          </NameWrapper>
          <div>
            <S.OpacitySpan>{profile ? profile.email : "email"}</S.OpacitySpan>
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

const NameSpan = styled.span`
  font-size: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

const AvatarWrapper = styled.span`
  display: flex;
  justify-content: center;
`;

const Icon = styled.span`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;

  & > img {
    width: 20px;
  }
`;

//-------------------------------------------------------------------------------

// import React, { useState, KeyboardEvent } from "react";
// import ava from "assets/icon/ava.jpg";
// import { S } from "common/componentsBIG/Form_styles";
// import Paper from "@mui/material/Paper";
// import Avatar from "@mui/material/Avatar";
// import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import { useAppDispatch, useAppSelector } from "app/hooks";
// import { authThunks } from "features/auth/auth.slice";
// import panIcon from "assets/icon/pan.jpg";
// import TextField from "@mui/material/TextField";
//
// export const Profile = () => {
//   const profile = useAppSelector((state) => state.auth.profile);
//   const goToLogin = useAppSelector((state) => state.auth.goToLogin);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [edit, setEdit] = useState(false);
//
//   const logOuthandler = () => {
//     dispatch(authThunks.logout());
//   };
//
//   const updateHandler = () => {
//     const payload = {
//       name: "Yudzintsau",
//       //avatar?: string;
//     };
//     dispatch(authThunks.updateProfile({ payload }));
//   };
//
//   const editHandler = () => {
//     setEdit(!edit);
//   };
//
//   const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
//     if (event.key === "Enter") {
//       editHandler();
//     }
//   };
//
//   if (goToLogin) {
//     navigate("/login");
//   }
//
//   return (
//       <S.Wrapper>
//         <Paper elevation={2} style={{ width: "350px" }}>
//           <S.FormWrapper>
//             <h2 style={{ fontFamily: "Montserrat" }}>Personal Information</h2>
//
//             <AvatarWrapper>
//               <Avatar alt="Remy Sharp" src={ava} sx={{ width: 124, height: 124 }} />
//             </AvatarWrapper>
//
//             <NameWrapper>
//               {edit ? (
//                   <TextField value={profile ? profile.name : "user"} variant="standard" onKeyPress={onKeyPressHandler} />
//               ) : (
//                   <NameSpan>{profile ? profile.name : "user"} </NameSpan>
//               )}
//               <Icon onClick={editHandler}>
//                 <img src={panIcon} alt="panIcon" />
//               </Icon>
//             </NameWrapper>
//
//             <div>
//               <S.OpacitySpan>{profile ? profile.email : "email"}</S.OpacitySpan>
//             </div>
//
//             <S.TipicalWrapper>
//               <ButtonComponent buttonName={"Log out"} callback={logOuthandler} disabled={false} />
//             </S.TipicalWrapper>
//
//             <S.TipicalWrapper>
//               <span>Did you remember your password?</span>
//             </S.TipicalWrapper>
//
//             <S.DontHaveAccount>
//               <Link to={"/login"}>Try logging in</Link>
//             </S.DontHaveAccount>
//           </S.FormWrapper>
//         </Paper>
//       </S.Wrapper>
//   );
// };
//
// const NameSpan = styled.span`
//   font-size: 20px;
// `;
//
// const NameWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   margin-top: 30px;
// `;
//
// const AvatarWrapper = styled.span`
//   display: flex;
//   justify-content: center;
// `;
//
// const Icon = styled.span`
//   margin-left: 5px;
//   margin-top: 4px;
//   cursor: pointer;
//
//   & > img {
//     width: 20px;
//   }
// `;
