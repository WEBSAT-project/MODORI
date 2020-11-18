import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import Swal from "sweetalert2";

const CommentBox = styled.div`
  display: grid;
  height: auto;
  direction: wrap;
  word-wrap: break-word;
  grid-template-columns: 9.5fr 0.5fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "name time time"
    "main main del";
  border-bottom: 1px solid black;
  grid-column: auto / span 2;
`;
const CommentInputDiv = styled.div`
  padding: 0.5rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 10fr 1fr;
  grid-template-rows: 5vh;
`;

const CommentInput = styled.input`
  font-size: 1rem;
`;

const CommentInputSubmit = styled.div`
  border: 1px solid black;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const CommentDel = styled.button`
  border: 1px solid black;
  &:hover {
    background-color: #ed4337;
    color: white;
  }
  transition: 0.2s ease-in-out;
  background-color: #ffe0e2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SERVER = "http://10.80.163.169:8080";
const token = localStorage.getItem("token");
const Comment = ({ postCode, history, ableDel }) => {
  const [comment_Text, setComment_Text] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const comments = await Axios.get(`${SERVER}/getComments/${postCode}`);
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
        },
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
      const { data } = await Axios.delete(`${SERVER}/C_delete/${postCode}`);
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
        <div style={{ gridArea: "main" }}>{comment.Comment_Text}</div>
        <div style={{ gridArea: "time" }}>{comment.Comment_Time}</div>
        <div style={{ gridArea: "name" }}>{comment.nick_name}</div>
        {!ableDel ? (
          <CommentDel style={{ gridArea: "del" }} onClick={commentDel}>
            삭제
          </CommentDel>
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
            setComment_Text("");
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
