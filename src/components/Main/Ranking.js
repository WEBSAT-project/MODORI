import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    display:gird;
    grid-template-columns:1vh 1vh 1vh;
    grid-template-rows:1vh 1vh 1vh;
    grid-template-areas:
    ". border ."
    "border border ."
    "border border border";
`;

const Border = styled.div`
    border: 0.1rem solid black;
    grid-area:border;
`;

const Ranking = ({ rankList }) => {
    console.log(rankList);
    return (
        <RankingDiv>
            <MainHeader />
            <Stairs>
                <Border />
                //{rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
