import React, { useEffect } from "react";
import styled from "styled-components";
import MainHeader from "./MainHeader";

const RankingDiv = styled.div``;

const Stairs = styled.div`
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-auto-flow:column;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(${props => props.rankNum+2},20vh);
    grid-template-areas:
        "SS FF TT "
        "SS F  TT "
        "S  F  TT"
        "S  F  T "
        "B  B  B ";
`;
const Border = styled.div`
    background-color:#bdbfbe;
    height:50%;
    font-weight:1000;
    font-size:2rem;
    grid-area:B;
    
`;
const FBorder = styled.div`
    border:1rem solid #6DF2C1; 
    grid-area: F;
    width: 100%;
    height: 100%;
    background-color: #6DF2C1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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
    justify-content: flex-start;
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
    justify-content: flex-start;
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
                <Border style={{
                                textAlign:"left",
                                display:"grid", 
                                gridTemplateColumns:"2fr 1fr 1fr",
                                gridColumn:"auto / span 3",
                                alignItems:"center",
                            }}>
                    <div>순위</div>
                    <div>닉네임</div>
                    <div>게시글</div>
                </Border>
                {rankList}
            </Stairs>
        </RankingDiv>
    );
};

export default Ranking;
