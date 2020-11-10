import React from "react";
import styled from "styled-components";
import LogoTitle from "../../assets/modori_logo_title.png";

const MainFooterDiv = styled.div`
    background-color: #38a67e;
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f2f2f2;
    flex-direction: column;
    font-weight: bold;
`;

const Logo2 = styled.img.attrs({
    src: LogoTitle,
})`
    width: 10%;
`;

const MainFooter = () => {
    return (
        <MainFooterDiv>
            <div>메모장이 없는 당신을 위해!</div>
            <Logo2 draggable="false" />
        </MainFooterDiv>
    );
};

export default MainFooter;
