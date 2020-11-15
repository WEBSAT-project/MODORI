import React from "react";
import styled from "styled-components";
// import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import jwtDecode from "jwt-decode";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import Axios from "axios";

const PostDiv = styled.div`
    width: 100%;
`;

const PostCanvasContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 20vh;
`;

const PostHeader = styled.div`
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
`;
const PostBody = styled.div`
    height: 50vh;
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
    overflow-y: auto;
    border-top: none;
    padding: 1rem;
`;
const SERVER = "http://10.80.163.169:8080";
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
    const onDelete = async () => {
        console.log(props.post.Post_Code);
        await Swal.fire({
            title: "확실합니까?",
            text: "다시 복구할 수 없습니다!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "네, 삭제할께요!",
            cancelButtonText: "좀 더 생각해볼게요",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    Axios.delete(`${SERVER}/delete/${Post_Code}`);
                } catch (err) {
                    console.log(err);
                }
                window.location.reload();
            }
        });
    };
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
                        <PostCanvasContainer>
                            <img
                                src={image_pass}
                                alt="그림입니다."
                                draggable="false"
                            />
                        </PostCanvasContainer>
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
            {console.log(props)}
            {Post_nick_name ? <button onClick={onDelete}>삭제</button> : null}
        </PostDiv>
    );
};

export default Post;
