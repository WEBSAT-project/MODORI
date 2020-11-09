import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import FullLogo from "../../assets/modori_logo_full.png";
const HeaderDiv = styled.div`
    border: 2px solid #bdbfbe;
    box-sizing: border-box;
    padding: 2rem;
    display: flex;
`;

const NavContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 3rem;

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 1.2rem;
    }
    a:hover {
    }
`;

const Logo = styled.img.attrs({
    src: FullLogo,
})`
    width: 5%;
    max-width: 100%;
    margin: 1rem;
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

const MainHeader = () => {
    return (
        <HeaderDiv>
            <Logo />
            <NavContainer>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact
                    to="/"
                >
                    내가 쓴 글
                </NavLink>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact
                    to="/shareboard"
                >
                    다른 사람이 쓴 글
                </NavLink>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact
                    to="/setprofile"
                >
                    프로필 설정
                </NavLink>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact
                    to="/memo"
                >
                    글쓰기
                </NavLink>
                {localStorage.getItem("token") ? (
                    <div style={{ textAlign: "center" }}>
                        홍준혁
                        <h1>밀크</h1>
                        <Button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.replace("/");
                            }}
                        >
                            로그아웃
                        </Button>
                    </div>
                ) : (
                    <Link exact to="/login">
                        <Button>로그인</Button>
                    </Link>
                )}
            </NavContainer>
        </HeaderDiv>
    );
};
export default MainHeader;
