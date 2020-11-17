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

const SERVER = "http://10.80.163.169:8080";
const token = localStorage.getItem("token");
const Comment = ({ postCode, history }) => {
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
        console.log(comment_Text);
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

    const commentList = comments.map((comment) => {
        return (
            <CommentBox>
                <div>{comment.Comment_Text}</div>
                <div>{comment.Comment_Time}</div>
                <div>{comment.nick_name}</div>
            </CommentBox>
        );
    });
    useEffect(() => {
        getComments().then((res) => {
            // console.log(res.data.result.length);
            setComments(res.data.result);
        });
    }, []);
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
                        history.go(0);
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
