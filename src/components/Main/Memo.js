import React from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const MemoDiv = styled.div`
    background-color: #f2f2f2;
`;

const Memo = () => {
    return (
        <MemoDiv>
            <MainHeader />
            <MainFooter />
        </MemoDiv>
    );
};

export default Memo;
