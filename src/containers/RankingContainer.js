import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Ranking from "../components/Main/Ranking";

const SERVER = "http://10.80.163.169:8080";

const RankingContainer = () => {
    const [ranks, setRanks] = useState([]);
    const getRank = async () => {
        try {
            const rank = await Axios.get(`${SERVER}/post/ranking`);
            return rank;
        } catch (err) {
            console.log(err);
        }
    };

    const RankDiv = styled.div`
        border: 1px solid black;
    `;

    // const ranklist = ranks.map((rank) => {
    //     return <div>{rank}</div>;
    // });

    useEffect(() => {
        getRank().then((response) => {
            setRanks(response.data.result);
        });
    }, []);

    console.log(ranks);

    const rankList = ranks.map((rank) => {
        return (
            <RankDiv>
                <div>이메일:{rank.Post_Email}</div>
                <div>닉네임:{rank.Post_nick_name}</div>
                <div>글 쓴 횟수{rank.cnt_Email}</div>
            </RankDiv>
        );
    });

    return <Ranking rankList={rankList} />;
};

export default RankingContainer;
