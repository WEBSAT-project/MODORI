import React, { useState } from "react";
import { FcSearch } from "react-icons/fc";
import styled from "styled-components";
import MainFooter from "./MainFooter";
import LogoTitle from "../../assets/modori_logo_title.png";
import Post from "./Post";
import MainHeader from "./MainHeader";
import jwt_decode from "jwt-decode";

const MainDiv = styled.div`
    width: 100%;
    background-color: ${(props) => props.color};
`;

// const Logo2 = styled.img.attrs({
//     src: LogoTitle,
// })`
//     width: 10%;
// `;

const MainBody = styled.div`
    padding: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

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

const MainDivColor = "#f2f2f2";

const Main = ({ isLoggedin }) => {
    return (
        <MainDiv color={MainDivColor}>
            <MainHeader />
            <MainBody>
                <Post
                    title="저는 디자인하는 노예입니다."
                    draw="https://ichef.bbci.co.uk/news/640/cpsprodpb/E225/production/_115039875_biden_trump_11_split_index.jpg"
                />
                <Post
                    draw="https://honglim001.github.io/CAD/ToDoList_2.PNG"
                    title="이거 디자인 좀 별로야"
                />
                <Post
                    draw="https://miro.medium.com/max/3686/1*OWpoPsr8wK1DKmXfi_4d4Q.png"
                    title="서버개같네"
                />
                <Post
                    draw="https://i.pinimg.com/originals/18/16/bc/1816bcd22f51c90cb3ebbc5f494d4836.jpg"
                    title="여기 내이름 왜 넣냐?"
                />
                <Post
                    draw="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-202005_GEO_KR?wid=892&hei=820&&qlt=80&.v=1587460346205"
                    title="ICT끝나고 앱이나 해야지"
                />
            </MainBody>

            <SearchInput>
                <input placeholder="검색을 해보세요" />
                <FcSearch
                    onClick={() => {
                        alert("응 없어");
                    }}
                />
            </SearchInput>
            <MainFooter />
        </MainDiv>
    );
};

export default Main;
