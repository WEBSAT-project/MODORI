import React, { useState } from "react";
import styled from "styled-components";
// import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Swal from "sweetalert2";
import Axios from "axios";
import Comment from "./Comment";

const PostDiv = styled.div`
    display: grid;
    grid-row-gap: 0.5rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.1fr 52.917vh 20vh 0.3fr 0.2fr;
    grid-template-areas:
        "head  head"
        "body  body"
        "co    co  "
        "border border"
        "del   del";
`;

const PostCanvasContainer = styled.div`
    width: 100%;
    height: 100%;
    grid-area: draw;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
    img {
        max-width: 100%;
        min-width: 100%;
        min-height: 100%;
        background-size: cover;
    }
`;

const PostHeader = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    grid-area: head;
`;
const PostBody = styled.div`
    height: 100%;
    /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.44); */
    display: grid;
    gap: 1%;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 52.917vh 1vh;
    grid-template-areas:
        "text draw"
        "border border";
    /* border: 2px solid #bdbfbe; */
    grid-area: body;
    /* img {
        max-width: 100%;
        /* max-height: 100%; */
    /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.44); */
`;

const Border = styled.div`
    border-bottom: 0.1rem solid #bdbfbe;
    grid-area: border;
`;
const PostBodyContent = styled.div`
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
    grid-area: text;
    overflow-y: auto;
`;

const StyledButton = styled.div`
    background-color: #ffe0e2;
    border: none;
    padding: 0.6rem;
    border-radius: 5px;
    cursor: pointer;
    margin: 0.5rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.44);
    transition: 0.2s ease-in-out;
    &:hover {
        background-color: #ed4337;
        color: white;
    }
`;

const CommentDiv = styled.div`
    grid-area: co;
    border: 1px solid black;
    overflow-y: auto;
    width: 100%;
    height: 100%;
`;

const SERVER = "http://10.80.163.169:8080";
const Post = (props) => {
    console.log(props);
    const {
        Title,
        Post_Time,
        Post_Text,
        Post_Code,
        Post_Email,
        Post_Update,
        Post_nick_name,
        image_pass,
    } = props.post;
    const { isOwner, onDelete } = props;

    // const Md = new MarkdownIt().use((Md) => SupportReactComponent(Md, []));
    function InlineCodeBlock(props) {
        return <span style={{ background: "#ff0" }}>{props.value}</span>;
    }

    function BlockQuoteBlock(props) {
        return (
            <div
                style={{
                    border: "1px solid #aaa",
                    borderLeft: "5px solid #bdbfbe",
                    paddingLeft: 10,
                    margin: 5,
                }}
            >
                {props.children}
            </div>
        );
    }

    function CodeBlock(props) {
        return (
            <pre
                style={{
                    background: "#000",
                    color: "#fff",
                    padding: 10,
                    borderRadius: "5px",
                }}
            >
                <code>{props.value}</code>
            </pre>
        );
    }

    function TableCellBlock(props) {
        let style = {
            textAlign: props.align ? props.align : "center",
            padding: 5,
        };

        if (props.isHeader) {
            style.background = "#38a67e";
            style.color = "#f2f2f2";
            // style.border = "1px solid #ccc";
            // style.borderLeft = 0;
            // style.borderRight = 0;
        } else {
            // style.border = "1px solid #eee";
            style.background = "#dee2e6";
            style.borderBottom = "1px solid #eee";
        }

        return <td style={style}>{props.children}</td>;
    }

    return (
        <PostDiv>
            <PostHeader>
                <div>
                    {/* <div style={{ fontSize: "1rem", color: "dimgray" }}>
                        {Post_Code}#
                    </div> */}
                    <div>{Title}</div>
                </div>
                <div
                    style={{
                        color: "#4c7364",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "flex-end",
                    }}
                >
                    {Post_nick_name ? Post_nick_name : <>이름 없음</>}
                    <div
                        style={{
                            fontFamily: "lighter",
                            color: "dimgrey",
                            fontSize: "1rem",
                        }}
                    >
                        글 쓴 시간 :{" "}
                        {`${Post_Time.split("T")[0]} ${
                            Post_Time.split("T")[1].split(".")[0]
                        }`}
                        {Post_Update}
                    </div>
                </div>
            </PostHeader>
            <PostBody>
                <>
                    {image_pass ? (
                        <PostCanvasContainer style={{ gridArea: "draw" }}>
                            <img
                                src={`${SERVER}/static/${image_pass}`}
                                alt="그림입니다."
                                draggable="false"
                            />
                        </PostCanvasContainer>
                    ) : (
                        <PostCanvasContainer>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHjLUuzIB3EwLHArtpnICh1pzUj8x6dYhpA&usqp=CAU"
                                alt=""
                            />
                        </PostCanvasContainer>
                    )}
                    <PostBodyContent>
                        <ReactMarkdown
                            source={Post_Text}
                            renderers={{
                                code: CodeBlock,
                                tableCell: TableCellBlock,
                                inlineCode: InlineCodeBlock,
                                blockquote: BlockQuoteBlock,
                            }}
                            plugins={[gfm]}
                        />
                    </PostBodyContent>
                </>

                {/* 댓글 컴포넌트를 여기 넣어주세요! */}
            </PostBody>
            <CommentDiv>
                <Comment postCode={Post_Code} nickName={Post_nick_name} />
            </CommentDiv>
            <Border />
            {isOwner ? (
                <StyledButton
                    onClick={() => onDelete(Post_Code)}
                    style={{ gridArea: "del" }}
                >
                    삭제
                </StyledButton>
            ) : null}
        </PostDiv>
    );
};

export default Post;
