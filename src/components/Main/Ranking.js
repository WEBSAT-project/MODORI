import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    width:100%;
    display:grid;
    gap:1rem;
    grid-template-columns:33% 33% 33%;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
    ". FF ."
    "SS F ."
    "S F TT"
    "S F T"
    "row . .";
`;

const RList = styled.div`

`;

const FBorder = styled.div`
    border: 0.1rem solid black;
    grid-area:F;
    width:100%;
    height:100%;
`;

const SBorder = styled.div`
    border: 0.1rem solid black;
    grid-area:S;
    width:100%;
    height:100%;
`;

const TBorder = styled.div`
    border: 0.1rem solid black;
    grid-area:T;
    width:100%;
    height:100%;
`;

const Ranking = ({ rankList }) => {
    console.log(rankList);
    return (
        <RankingDiv>
            <MainHeader />
            <Stairs>
                <FBorder />
                <SBorder />
                <TBorder />
                {rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
