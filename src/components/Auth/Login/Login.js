import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Background from "../../../assets/backgroundMac.png";
import FullLogo from "../../../assets/modori_logo_full.png";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: 100% 100vh;
  display: flex;
  justify-content: center;
`;

const LoginDiv = styled.div`
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img.attrs({
  src: FullLogo,
})`
  width: 10%;
  margin: 1rem;
  cursor: pointer;
`;

const LoginInput = styled.input`
  outline: none;
  width: 25%;
  font-size: 1rem;
  padding: 2vh;
  margin: 0.3rem;
  box-sizing: border-box;
  border: none;
  border: 2px solid #dee2e6;
  border-radius: 70px;
  background: #f1f3f5;
  font-family: "NotoSans" !important;
  &:focus {
    color: #38a67e;
  }
`;

const LoginSubmit = styled.button`
  box-sizing: border-box;
  width: 25%;
  padding: 2vh;
  margin-top: 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 70px;
  outline: none;
  background-color: #6df2c1;
  font-weight: bold;
  font-family: "NotoSans" !important;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(0.95);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  a {
    font-family: "NotoSans" !important;
    text-decoration: none;
    color: black;
    border-bottom: 2px solid black;
    margin-right: 1rem;
  }
`;

const Login = ({ onSubmit, id, setId, password, setPassword, goHome }) => {
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "id") setId(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <LoginWrapper>
        <LoginDiv>
          <Logo onClick={goHome} />
          <LoginInput
            placeholder="이메일"
            spellCheck="false"
            onChange={onChange}
            value={id}
            name="id"
          />
          <LoginInput
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={password}
            name="password"
          />

          <LoginSubmit onClick={onSubmit}>로그인</LoginSubmit>

          <LinkContainer>
            <Link to="join">회원가입</Link>
            <Link to="repassword">비밀번호 재설정</Link>
          </LinkContainer>
        </LoginDiv>
      </LoginWrapper>
    </>
  );
};

export default Login;
