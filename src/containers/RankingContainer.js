import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Ranking from "../components/Main/Ranking";

const SERVER = "http://10.80.163.169:8080";

const RankingContainer = () => {
    const [ranks, setRanks] = useState([]);
    let rankNum = 0;
    const rankColor = [
        {
            color: "#FFD700",
        },
        {
            color: "#C0C0C0",
        },
        {
            color: "#995B5B",
        },
    ];
    const rankStairs = [
        {
            gridArea: "FF",
        },
        {
            gridArea: "SS",
        },
        {
            gridArea: "TT",
        },
    ];
    const getRank = async () => {
        try {
            const rank = await Axios.get(`${SERVER}/post/ranking`);
            return rank;
        } catch (err) {
            console.log(err);
        }
    };

    const RanksDiv = styled.div`
        height: 100%;
        text-align: center;
    `;

    const RankDiv = styled.div`
        color: ${(props) => props.color};
        grid-area: ${(props) => props.gridArea};
    `;
    // const ranklist = ranks.map((rank) => {
    //     return <div>{rank}</div>;
    // });

    useEffect(() => {
        getRank().then((response) => {
            setRanks(response.result);
            console.log(ranks);
        });
    }, []);

    console.log(rankColor);

    const rankList = ranks.map((rank) => {
        rankNum += 1;
        return (
            <>
                {rankNum <= 3 ? (
                    <RankDiv
                        style={{ fontSize: "2rem" }}
                        color={rankColor[rankNum - 1].color}
                        gridArea={rankStairs[rankNum - 1].gridArea}
                    >
                        <RanksDiv>
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "1rem",
                                    width: "100%",
                                }}
                            >
                                이메일:{rank.Post_Email}
                            </div>
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "1rem",
                                    width: "100%",
                                }}
                            >
                                닉네임:{rank.Post_nick_name}
                            </div>
                            <div
                                style={{
                                    color: "black",
                                    fontSize: "1rem",
                                    width: "100%",
                                }}
                            >
                                점수 : {rank.cnt_Email}
                            </div>
                        </RanksDiv>
                    </RankDiv>
                ) : (
                    <RanksDiv
                        style={{
                            gridArea: rankNum,
                            border: "0.05rem solid black",
                        }}
                    >
                        {rankNum}
                        <div style={{}}>이메일:{rank.Post_Email}</div>
                        <div style={{}}>닉네임:{rank.Post_nick_name}</div>
                        <div style={{}}>점수 : {rank.cnt_Email}</div>
                    </RanksDiv>
                )}
            </>
        );
    });

    return <Ranking rankList={rankList} />;
};

export default RankingContainer;
