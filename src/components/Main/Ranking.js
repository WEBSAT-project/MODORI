import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Ranking = ({ rankList }) => {
    console.log(rankList);
    return (
        <RankingDiv>
            <MainHeader />
            {rankList}
        </RankingDiv>
    );
};

export default Ranking;
