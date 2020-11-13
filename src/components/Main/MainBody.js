import React from "react";
import styled from "styled-components";
import Post from "./Post";
import Loadger from "react-loader-spinner";
import Loader from "react-loader-spinner";

const PostListDiv = styled.div`
    padding: 3rem;
    display: grid;
    gap: 5% 3%;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    background-color: white;
`;

const MainBodyDiv = styled.div`
    width: 100%;
    height: 80vh;
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
    console.log(postList.length);
    return (
        <MainBodyDiv>
            {isLoading ? (
                <LoadingDiv>
                    <Loader type="Grid" color="#5ebf9b" />
                    <h3>로딩중...</h3>
                </LoadingDiv>
            ) : (
                <PostListDiv
                    style={{
                        gridArea: "main",
                    }}
                >
                    {postList}
                </PostListDiv>
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
