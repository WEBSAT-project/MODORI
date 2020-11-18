import React from "react";
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
  width: 100%;
  height: 80vh;
  padding: 3rem;
  padding-top: 20vh;
`;

const LoadingDiv = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TopButton = styled.div`
  background-color: #6df2c1;
  position: fixed;
  width: 7%;
  bottom: 7px;
  right: 0px;
  border-radius: 30px 0 0 30px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const MainBody = ({ postList, isLoading, setIsLoading }) => {
  return (
    <MainBodyDiv>
      {isLoading ? (
        <LoadingDiv>
          <Loader type="Grid" color="#5ebf9b" />
          <h3>로딩중...</h3>
        </LoadingDiv>
      ) : (
        <>
          {postList.length === 0 ? (
            <LoadingDiv>나만의 글을 작성해보세요!</LoadingDiv>
          ) : (
            postList
          )}
        </>
        // <PostListDiv>
        //   {postList}
        //   <TopButton
        //     onClick={() => {
        //       window.scrollTo(0, 0);
        //     }}
        //   >
        //     위로!
        //   </TopButton>
        // </PostListDiv>
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
