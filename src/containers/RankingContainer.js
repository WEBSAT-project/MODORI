import React from "react";
import Axios from "axios";
import Ranking from "../components/Main/Ranking";

const SERVER = "http://10.80.163.169:8080";

const getRank = async () => {
    try {
        const rank = await Axios.get(`${SERVER}/ranking`);
        console.log(rank);
    } catch (err) {
        console.log(err);
    }
};

const RankingContainer = () => {
    return <Ranking />;
};

export default RankingContainer;
