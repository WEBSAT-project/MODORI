import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    padding: 1rem;
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr 1fr 0.7fr;
    grid-template-rows: 20vh 20vh 20vh 20vh;
    grid-template-areas:
        ". FF ."
        "SS F ."
        "S F TT"
        "S F T";
`;

const Border = styled.div`
    border: 0.1rem solid black;
    grid-area: b;
`;

const FBorder = styled.div`
    border: 0.1rem solid black;
    grid-area: F;
    width: 100%;
    height: 100%;
    background-color: black;
    align-items: center;
    display: flex;
    font-size: 19rem;
    color: rgb(255, 215, 0);
`;

const SBorder = styled.div`
    border: 0.1rem solid black;
    grid-area: S;
    width: 100%;
    height: 100%;
    background-color: black;
    font-size: 3rem;
    color: #c0c0c0;
`;

const TBorder = styled.div`
    border: 0.1rem solid black;
    grid-area: T;
    width: 100%;
    height: 100%;
    background-color: black;
    color: #995b5b;
`;

const Ranking = ({ rankList }) => {
    return (
        <RankingDiv>
            <MainHeader />
            <Stairs>
                <FBorder>1</FBorder>
                <SBorder>2</SBorder>
                <TBorder>3</TBorder>
                <Border></Border>
                {rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
