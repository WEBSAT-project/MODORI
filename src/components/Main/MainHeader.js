import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Link, withRouter } from "react-router-dom";
import FullLogo from "../../assets/modori_logo_full.png";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const HeaderDiv = styled.div`
  border-bottom: 2px solid black;
  box-sizing: border-box;
  position:${(props) => props.pos ?props.pos :  "fixed"};
  background-color:white;
  width:100%;
`;

const NavContainer = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  //justify-items:center;
  gap: 0.5rem;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 3fr;
  grid-template-rows: 1vh 10vh 1vh;
  grid-template-areas: " .    .     .  .    .   .  " //1
    " logo share my memo ranking  log  " //2
    " .    .     .  .    .   .  "; //3

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1.2rem;
  }
  a:hover {
  }
`;

const Nickname = styled.div`
  grid-area: nick;
  color: #5ebf9b;
  font-size: 1.2rem;
`;

const Log = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-template-areas: "nick button";
`;
const Logo = styled.img.attrs({
  src: FullLogo,
})`
  width: 4rem;
  max-width: 4rem;
  margin: 1rem;
  cursor: pointer;
`;

const Button = styled.button`
  background: #2f2f2f;
  color: white;
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const MainHeader = ({ history , pos }) => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decoded, setDecoded] = useState({
    name: "",
    nick: "",
  });

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      setDecoded(jwt_decode(token));
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, token]);
  // token ? setIsLoggedIn(true) : setIsLoggedIn(false);

  return (
    <HeaderDiv pos={pos}>
      <NavContainer>
        <Logo
          onClick={() => history.push("/")}
          style={{
            gridArea: "logo",
          }}
        />
        <NavLink
          activeStyle={{
            borderBottom: "2px solid green",
            paddingBottom: "1rem",
          }}
          style={{
            gridArea: "share",
            textAlign: "center",
            width: "50%",
          }}
          exact
          to="/"
        >
          공유 게시글
        </NavLink>

        <NavLink
          activeStyle={{
            borderBottom: "2px solid green",
            paddingBottom: "1rem",
          }}
          style={{
            gridArea: "my",
            textAlign: "center",
            width: "50%",
          }}
          exact
          to="/setprofile"
        >
          내 게시글
        </NavLink>
        <NavLink
          activeStyle={{
            borderBottom: "2px solid green",
            paddingBottom: "1rem",
          }}
          style={{
            gridArea: "memo",
            textAlign: "center",
            width: "50%",
          }}
          exact
          to="/memo"
        >
          글쓰기
        </NavLink>
        <NavLink
          activeStyle={{
            borderBottom: "2px solid green",
            paddingBottom: "1rem",
          }}
          style={{
            gridArea: "ranking",
            textAlign: "center",
            width: "50%",
          }}
          exact
          to="/ranking"
        >
          랭킹
        </NavLink>
        {isLoggedIn ? (
          <Log
            style={{
              textAlign: "center",
              gridArea: "log",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10%",
            }}
          >
            <Nickname>{decoded.nick}</Nickname>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                history.push("/");
              }}
              style={{
                gridArea: "button",
              }}
            >
              로그아웃
            </Button>
          </Log>
        ) : (
          <Link
            exact
            to="/login"
            style={{
              gridArea: "log",
            }}
          >
            <Button>로그인</Button>
          </Link>
        )}
      </NavContainer>
    </HeaderDiv>
  );
    
};
export default withRouter(MainHeader);
