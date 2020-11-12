import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import MainBodyContainer from "../../containers/MainBodyContainer";
import Axios from "axios";
import Swal from "sweetalert2";
import Post from "./Post";
const MainDiv = styled.div`
    width: 100%;
    background-color: white;
`;

// const Logo2 = styled.img.attrs({
//     src: LogoTitle,
// })`
//     width: 10%;
// `;

// const MainFooter = styled.div`
//     background-color: #38a67e;
//     width: 100%;
//     height: 20vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #f2f2f2;
//     flex-direction: column;
//     font-weight: bold;
// `;

const SearchInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
    background: white;
    input {
        padding: 0.5rem;
        border: none;
        outline: none;
    }
    svg {
        cursor: pointer;
        margin: 0.3rem;
    }
`;


const SERVER = "http://10.80.163.169:8080";

const Main = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchData, setSearchData] = useState();
    const handleSearch = async () => {
        try {
            const { data } = await Axios.get(
                `${SERVER}/?keyword=${searchInput}`
            );
            console.log(data.result);
            const searchPosts = data.result;
            setSearchData(searchPosts);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MainDiv >
            <MainHeader />
            <MainBodyContainer data={searchData} />
            {/* <SearchInput>
                <input
                    placeholder="검색을 해보세요"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
                <FcSearch onClick={handleSearch} />
            </SearchInput> */}
           
        </MainDiv>
    );
};

export default Main;
