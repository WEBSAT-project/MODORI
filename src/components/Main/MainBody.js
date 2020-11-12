import React from "react";
import styled from "styled-components";
import Post from "./Post";

const MainBodyDiv = styled.div`
        padding: 3rem;
    display: grid;
    gap: 20px 3%;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    background-color:whitesmoke;
`;


const MainBody = ({ postList }) => {
    return (
        <MainBodyDiv>
            {postList.length !== 0 ? postList : <>게시글을 입력해주세요</>}
        </MainBodyDiv>
    );
};

export default MainBody;
