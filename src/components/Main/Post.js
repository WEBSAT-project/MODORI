import React from "react";
import styled from "styled-components";
import FullLogo from "../../assets/modori_logo(1).png";
const PostDiv = styled.div`
    width: 800px;
    margin-bottom: 5rem;
`;

const PostHeader = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
`;
const PostBody = styled.div`
    /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.44); */
    display: flex;
    /* border: 2px solid #bdbfbe; */
    flex-direction: column;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
    img {
        max-width: 100%;
        /* max-height: 100%; */
        /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.44); */
    }
`;
const PostBodyContent = styled.div`
    border-top: none;
    padding: 1rem;
`;

const Post = ({ title, user, draw, text }) => {
    return (
        <PostDiv>
            <PostHeader>
                <h1>{title}</h1>
                <div
                    style={{
                        color: "#4c7364",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "flex-end",
                    }}
                >
                    {user}
                </div>
            </PostHeader>
            <PostBody>
                <>
                    <img src={draw} alt="그림입니다." draggable="false" />
                    <PostBodyContent>{text}</PostBodyContent>
                </>

                {/* 댓글 컴포넌트를 여기 넣어주세요! */}
            </PostBody>
        </PostDiv>
    );
};

Post.defaultProps = {
    title: "기본 제목",
    user: "홍준혁",
    draw: FullLogo,
    text: "안녕하세요",
};

export default Post;
