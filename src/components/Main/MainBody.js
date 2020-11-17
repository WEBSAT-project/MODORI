import React, { useRef } from "react";
import styled from "styled-components";
import Post from "./Post";
import Loader from "react-loader-spinner";
import MainFooter from "./MainFooter";

const PostListDiv = styled.div`
    display: grid;
    gap: 0.5%;
    grid-template-rows: 1fr;
    background-color: white;
`;

const MainBodyDiv = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    height: 80vh;
    padding: 3rem;
`;

const LoadingDiv = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const MainBody = ({ postList, isLoading, setIsLoading }) => {
    const main = useRef();
    // console.log(main.current.scrollHeight); //스크롤의 끝
    return (
        <MainBodyDiv ref={main}>
            {isLoading ? (
                <LoadingDiv>
                    <Loader type="Grid" color="#5ebf9b" />
                    <h3>로딩중...</h3>
                </LoadingDiv>
            ) : (
                <PostListDiv>{postList}</PostListDiv>
            )}
        </MainBodyDiv>
        // {isLoading ? (
        //     <LoadingDiv>
        //         <Loader />
        //     </LoadingDiv>
        // ) : (
        //     <MainBodyDiv style={{
        //         gridArea: "main",
        //     }}>{postList}</MainBodyDiv>
        // )}

        // <MainBodyDiv
        //     style={{
        //         gridArea: "main",
        //     }}
        // >
        //     {isLoading ? (
        //         <LoadingDiv>
        //             <Loader />
        //         </LoadingDiv>
        //     ) : (
        //         postList
        //     )}
        // </MainBodyDiv>
    );
};

export default MainBody;
