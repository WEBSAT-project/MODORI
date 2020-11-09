import React from "react";
import styled from "styled-components";

const CommentsContainer = styled.div`
    border-top: 5px solid #bdbfbe;
    padding: 1rem;
    margin: 1rem;
`;

const CommentContainer = styled.div``;

const CommentContainerUser = styled.div`
    font-weight: bold;
    font-size: 1.4rem;
`;
const UserComment = styled.div``;
const Comment = ({ user, comment, ...props }) => {
    return (
        <>
            <CommentsContainer>
                <CommentContainer>
                    <CommentContainerUser>{user}</CommentContainerUser>
                    <UserComment>{comment}</UserComment>
                </CommentContainer>
            </CommentsContainer>
        </>
    );
};

Comment.defaultProps = {
    user: "홍준혁",
    comment: "유익해요!",
};

export default Comment;
