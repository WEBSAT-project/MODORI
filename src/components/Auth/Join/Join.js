import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Background from "../../../assets/backgroundMac.png";
import FullLogo from "../../../assets/modori_logo_full.png";

const JoinWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: 100% 100vh;
    display: flex;
    justify-content: center;
`;

const JoinDiv = styled.div`
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

const JoinInput = styled.input`
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
    &:focus {
        color: #38a67e;
    }
`;

const JoinCheck = styled.button`
    width: 25%;
    border-radius: 70px;
    padding: 1rem;
    border: none;
    outline: none;
    transition: ease-in-out 0.2s;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
        background-color: #6df2c1;
    }
`;

const JoinSubmit = styled.button`
    box-sizing: border-box;
    width: 350px;
    padding: 2vh;
    margin-top: 2rem;
    font-size: 1rem;
    border: none;
    border-radius: 70px;
    outline: none;
    background-color: #6df2c1;
    font-weight: bold;
    cursor: pointer;
    transition: 0.1s ease-in-out;
    &:hover {
        transform: scale(0.95);
    }
`;

const LinkContainer = styled.div`
    a {
        text-decoration: none;
        color: black;
        border-bottom: 2px solid black;
        margin-right: 1rem;
    }
`;

// LoginContainer.js => requestSignIn 이라는 함수를 만들었어
// 이 함수는 입력한 정보를 갖다가
// 서버로 보내줄거야

const Login = ({
    id,
    setId,
    password,
    setPassword,
    chkPassword,
    setChkPassword,
    name,
    setName,
    nickname,
    setNickname,
    onSubmit,
    onChkEmail,
    onChkNickname,
    isChecked,
    setIsChecked,
    goHome,
}) => {
    return (
        <>
            <JoinWrapper>
                <JoinDiv>
                    <Logo onClick={goHome} />
                    <JoinInput
                        placeholder="이메일"
                        spellCheck="false"
                        value={id}
                        onChange={(e) => (
                            setId(e.target.value),
                            setIsChecked({
                                ...isChecked,
                                id: false,
                            })
                        )}
                    />
                    <JoinCheck onClick={onChkEmail}>
                        이메일 중복확인
                        {isChecked.id ? (
                            <div style={{ color: "green" }}>확인</div>
                        ) : (
                            <div style={{ color: "red" }}>미확인</div>
                        )}
                    </JoinCheck>
                    <JoinInput
                        placeholder="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <JoinInput
                        placeholder="비밀번호 확인"
                        type="password"
                        value={chkPassword}
                        onChange={(e) => setChkPassword(e.target.value)}
                    />
                    {chkPassword === ""
                        ? null
                        : password !== chkPassword
                        ? `비밀번호가 틀립니다`
                        : `비밀번호가 같습니다`}
                    <JoinInput
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nickname.length <= 8 ? (
                        <div style={{ color: "green" }}>
                            닉네임 제한 : {nickname.length} / 8
                        </div>
                    ) : (
                        <div style={{ color: "red" }}>
                            닉네임 제한 초과! {nickname.length}
                        </div>
                    )}
                    <JoinInput
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => (
                            setNickname(e.target.value),
                            setIsChecked({
                                ...isChecked,
                                nickname: false,
                            })
                        )}
                    />
                    <JoinCheck onClick={onChkNickname}>
                        닉네임 중복확인
                        {isChecked.nickname ? (
                            <div style={{ color: "green" }}>확인</div>
                        ) : (
                            <div style={{ color: "red" }}>미확인</div>
                        )}
                    </JoinCheck>
                    <JoinSubmit onClick={onSubmit}>회원가입</JoinSubmit>
                    <LinkContainer>
                        <Link to="/login">로그인 화면으로</Link>
                    </LinkContainer>
                </JoinDiv>
            </JoinWrapper>
        </>
    );
};

export default Login;
