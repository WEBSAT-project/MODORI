import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import Swal from "sweetalert2";

const CommentBox = styled.div`
    border: 1px solid black;
`;
const CommentInputDiv = styled.div`
    background: aqua;
`;

const CommentInput = styled.input``;

const CommentInputSubmit = styled.div`
    border: 1px solid black;
    width: 10%;
`;
const CommentDel = styled.button`
    border: 1px solid black;
`;

const SERVER = "http://10.80.163.169:8080";
const token = localStorage.getItem("token");
const Comment = ({ postCode, history, ableDel }) => {
    const [comment_Text, setComment_Text] = useState("");
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const comments = await Axios.get(
                `${SERVER}/getComments/${postCode}`
            );
            console.log(comments);
            return comments;
        } catch (err) {
            console.log(err);
        }
    };

    const postComments = async () => {
        try {
            const a = await Axios.post(
                `${SERVER}/create_comment/${postCode}`,
                {
                    Comment_Text: comment_Text,
                },
                {
                    headers: {
                        token: token,
                    },
                }
            );
            console.log(a);
            return a;
        } catch (err) {
            switch (err.response.status) {
                case 403:
                    Swal.fire({
                        title: err.response.data.message,
                        icon: "error",
                    });
                    break;
                default:
            }
        }
    };
    const commentDel = async () => {
        try {
            const { data } = await Axios.delete(
                `${SERVER}/C_delete/${postCode}`
            );
            if (data.message === "comment delete") {
                comments.filter((comment) => comment.Post_Code !== postCode);
                console.log(comments);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const commentList = comments.map((comment) => {
        return (
            <CommentBox>
                <div>{comment.Comment_Text}</div>
                <div>{comment.Comment_Time}</div>
                <div>{comment.nick_name}</div>
                {!ableDel ? (
                    <CommentDel onClick={commentDel}>삭제</CommentDel>
                ) : null}
            </CommentBox>
        );
    });
    useEffect(() => {
        getComments().then((res) => {
            // console.log(res.data.result.length);
            setComments(res.data.result);
            // myPosts.filter(
            //     (post) => post.Post_Code !== postCode
            // )
        });
    }, [comments]);
    return (
        <>
            <CommentInputDiv>
                <CommentInput
                    onChange={(e) => {
                        setComment_Text(e.target.value);
                    }}
                    value={comment_Text}
                />
                <CommentInputSubmit
                    onClick={() => {
                        postComments();
                    }}
                >
                    입력
                </CommentInputSubmit>
                {commentList}
            </CommentInputDiv>
        </>
    );
};

export default withRouter(Comment);
