import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import FullLogo from "../../assets/modori_logo_full.png";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
const HeaderDiv = styled.div`
    border: 2px solid #bdbfbe;
    box-sizing: border-box;
    display: flex;
    padding-left: 5rem;
    padding-right: 5rem;
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
    width: 7rem;
    max-width: 7rem;
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
        <HeaderDiv>
            <Logo />
            <NavContainer>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact={true}
                    to="/"
                >
                    다른 사람이 쓴 글
                </NavLink>

                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact={true}
                    to="/setprofile"
                >
                    프로필/내 글
                </NavLink>
                <NavLink
                    activeStyle={{
                        borderBottom: "2px solid green",
                        paddingBottom: "1rem",
                    }}
                    exact={true}
                    to="/memo"
                >
                    글쓰기
                </NavLink>
                {isLoggedIn ? (
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{color:"#5ebf9b"}}>{decoded.nick}</h1>
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
                    <Link exact={true} to="/login">
                        <Button>로그인</Button>
                    </Link>
                )}
            </NavContainer>
        </HeaderDiv>
    );
};
export default MainHeader;
