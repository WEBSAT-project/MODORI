import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Ranking from "../components/Main/Ranking";

const SERVER = "http://192.168.0.28:8080";

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
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
      console.log(response.data.result);
      setRanks(response.data.result);
    });
  }, []);

  const rankList =
    ranks &&
    ranks.map((rank) => {
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
                    fontSize: "2rem",
                    fontWeight: "1000",
                    width: "100%",
                  }}
                >
                  {rank.Post_nick_name}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    width: "100%",
                  }}
                >
                  게시글 : {rank.cnt_Email}
                </div>
              </RanksDiv>
            </RankDiv>
          ) : (
            <RanksDiv
              style={{
                textAlign: "center",
                borderBottom: "0.1rem solid black",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridColumn: "auto / span 3",
                justifyContent: "space-evenly",
                fontSize: "1.5rem",
              }}
            >
              <div style={{ fontWeight: "500" }}>{rankNum}등</div>
              <div style={{ fontWeight: "1000" }}>{rank.Post_nick_name}</div>
              <div style={{}}>{rank.cnt_Email}</div>
            </RanksDiv>
          )}
        </>
      );
    });

  return <Ranking rankList={rankList} rankNum={rankNum} />;
};

export default RankingContainer;
