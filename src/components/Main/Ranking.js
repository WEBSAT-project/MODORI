import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    padding: 1rem;
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-auto-flow:column;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(${props => props.rankNum+1},20vh);
    grid-template-areas:
        "SS FF TT "
        "SS F  TT "
        "S  F  TT"
        "S  F  T ";
`;

const FBorder = styled.div`
    grid-area: F;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 215, 0);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 7rem;
    color: white;
`;

const SBorder = styled.div`
    grid-area: S;
    width: 100%;
    height: 100%;
    background-color: #c0c0c0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 7rem;
    color: white;
`;

const TBorder = styled.div`
    grid-area: T;
    width: 100%;
    height: 100%;
    background-color: #995b5b;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 7rem;
    color: white;
`;

const Ranking = ({ rankList , rankNum }) => {
    
    console.log(rankNum);
    return (
        <RankingDiv>
            <MainHeader />
            <Stairs rankNum={rankNum}>
                <FBorder>1</FBorder>
                <SBorder>2</SBorder>
                <TBorder>3</TBorder>
                {rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
