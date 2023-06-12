import React from "react";
import incubaIcon from "assets/icon/incubaIcon.jpg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
import Avatar from "@mui/material/Avatar";
import ava from "assets/icon/ava.jpg";
import { useAppSelector } from "common/hooks";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

type PropsType = {
  disabled?: boolean;
};

export const Header: React.FC<PropsType> = (props) => {
  const { disabled = false } = props;
  const profile = useAppSelector((state) => state.auth.profile);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const goToRegisterHandler = () => {
    navigate("/register");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Wrapper>
        <Icon>
          <img src={incubaIcon} alt="incubaIcon" />
        </Icon>

        {profile ? (
          <LoginWrapper>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenu} sx={{ mr: 2 }}>
              <NameSpan>{profile.name}</NameSpan>
              <Avatar style={{ marginTop: "-7px" }} alt="Remy Sharp" src={ava} sx={{ width: 40, height: 40 }} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/cards");
                  }}
                >
                  cards
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
              </Menu>
            </IconButton>
          </LoginWrapper>
        ) : (
          <ButtonCase>
            <ButtonComponent buttonName={"Sign up"} callback={goToRegisterHandler} disabled={disabled} />
          </ButtonCase>
        )}
      </Wrapper>
      <LineWithShadow />
    </>
  );
};

const NameSpan = styled.span`
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const LoginWrapper = styled.span`
  margin-top: 18px;
  display: flex;
`;

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

//---------------------------------------------------------------------

// import React from "react";
// import incubaIcon from "assets/icon/incubaIcon.jpg";
// import styled from "styled-components";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import { ButtonComponent } from "common/componentsSmall/ButtonComponent";
// import panIcon from "assets/icon/pan.jpg";
// import Avatar from "@mui/material/Avatar";
// import ava from "assets/icon/ava.jpg";
// import { useAppSelector } from "common/hooks";
//
// type PropsType = {
//     disabled?: boolean;
// };
//
// export const Header: React.FC<PropsType> = (props) => {
//     const { disabled = false } = props;
//     const profile = useAppSelector((state) => state.auth.profile);
//     const navigate = useNavigate();
//
//     const goToRegisterHandler = () => {
//         navigate("/register");
//     };
//
//     return (
//         <>
//             <Wrapper>
//                 <Icon>
//                     <img src={incubaIcon} alt="incubaIcon" />
//                 </Icon>
//
//                 {profile ? (
//                     <LoginWrapper>
//                         <span style={{ marginRight: "10px" }}>{profile.name}</span>
//                         <Avatar style={{ marginTop: "-7px" }} alt="Remy Sharp" src={ava} sx={{ width: 40, height: 40 }} />
//                     </LoginWrapper>
//                 ) : (
//                     <ButtonCase>
//                         <ButtonComponent buttonName={"Sign up"} callback={goToRegisterHandler} disabled={disabled} />
//                     </ButtonCase>
//                 )}
//             </Wrapper>
//             <LineWithShadow />
//         </>
//     );
// };
//
// const LoginWrapper = styled.span`
//   margin-top: 18px;
//   display: flex;
// `;
//
// const Wrapper = styled.span`
//   height: 60px;
//   display: flex;
//   justify-content: space-around;
// `;
//
// const ButtonCase = styled.span`
//   height: 60px;
//
//   & > button {
//     margin-top: 10px;
//   }
// `;
//
// const Icon = styled.span`
//   & > img {
//     width: 250px;
//   }
// `;
//
// const LineWithShadow = styled.div`
//   border-bottom: 1px solid #ffffff;
//   box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
// `;
