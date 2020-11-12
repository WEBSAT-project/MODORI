import React from "react";
import styled from "styled-components";
// import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const PostDiv = styled.div`
    width: 100%;
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

const Post = (props) => {
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
            <pre style={{ background: "#000", color: "#fff", padding: 10 }}>
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
                        글 쓴 시간 : {Post_Time}
                        {Post_Update}
                    </div>
                </div>
            </PostHeader>
            <PostBody>
                <>
                    {image_pass ? (
                        <img
                            src={image_pass}
                            alt="그림입니다."
                            draggable="false"
                        />
                    ) : (
                        <></>
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
        </PostDiv>
    );
};

export default Post;
