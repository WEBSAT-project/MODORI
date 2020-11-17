import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    display: gird;
    grid-template-columns: 1vh 1vh 1vh;
    grid-template-rows: 1vh 1vh 1vh;
    grid-template-areas:
        ". border ."
        "border border ."
        "border border border";
`;

const Border = styled.div`
    border: 0.1rem solid black;
    margin-left: 10rem;
    margin-right: 10rem;
    grid-area: border;
    text-align: center;
    font-size: 4rem;
`;

const Ranking = ({ rankList }) => {
    console.log(rankList);
    return (
        <RankingDiv>
            <MainHeader />
            <Stairs>
                <Border>랭킹</Border>
                {rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
