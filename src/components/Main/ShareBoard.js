import React from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const ShareBoardDiv = styled.div`
    width: 100%;
    background-color: #f2f2f2;
`;

const ShareBoard = () => {
    return (
        <ShareBoardDiv>
            <MainHeader />
            <MainFooter />
        </ShareBoardDiv>
    );
};
export default ShareBoard;
