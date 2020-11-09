import React from "react";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const SetProfileDiv = styled.div`
    background-color: #f2f2f2;
`;

const SetProfile = () => {
    return (
        <SetProfileDiv>
            <MainHeader />
            <MainFooter />
        </SetProfileDiv>
    );
};

export default SetProfile;
