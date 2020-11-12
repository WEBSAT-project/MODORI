import React from "react";
import styled from "styled-components";
import Post from "./Post";

const MainBodyDiv = styled.div`
    padding: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const MainBody = ({ postList }) => {
    return (
        <MainBodyDiv>
            {postList ? postList : <div>게시글을 입력해보세요</div>}
        </MainBodyDiv>
    );
};

export default MainBody;
