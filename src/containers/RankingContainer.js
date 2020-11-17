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
        border: 1px solid black;
        margin: 1rem;
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
            setRanks(response.data.result);
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
                        {rankNum}등
                    </RankDiv>
                ) : (
                    <RankDiv style={{ fontSize: "2rem", gridArea: "row" }}>
                        {rankNum}
                    </RankDiv>
                )}
                <RanksDiv style={{ gridArea: "row" }}>
                    <div style={{}}>이메일:{rank.Post_Email}</div>
                    <div style={{}}>닉네임:{rank.Post_nick_name}</div>
                    <div style={{}}>점수 : {rank.cnt_Email}</div>
                </RanksDiv>
            </>
        );
    });

    return <Ranking rankList={rankList} />;
};

export default RankingContainer;
