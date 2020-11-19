import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import timeCounting from "time-counting";

const CommentBox = styled.div`
  display: grid;
  height: auto;
  direction: wrap;
  word-wrap: break-word;
  grid-template-columns: 9.5fr 0.5fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "name time del"
    "main main del";
  border-bottom: 1px solid #bdbfbe;
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
  border: 0;
  outline: 0;
  border-bottom: 0.1rem solid #bdbfbe;
`;

const CommentInputSubmit = styled.button`
  border: 0;
  border-radius: 5px;
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #6df2c1;
  &:active {
    background-color: #4c7364;
    color: white;
  }
`;
const CommentDel = styled.button`
  &:hover {
    background-color: #ed4337;
    color: white;
  }
  transition: 0.2s ease-in-out;
  background-color: white;
  color: gray;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SERVER = "http://192.168.0.28:8080";

const Comment = ({ postCode, history, ableDel, nickName }) => {
  const token = localStorage.getItem("token");
  const user = token && jwtDecode(token);
  const [comment_Text, setComment_Text] = useState("");
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const comments = await Axios.get(`${SERVER}/getComments/${postCode}`);
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
      console.log(a.status);
      if (a.status === 200) {
        getComments().then((res) => {
          // console.log(res.data.result.length);
          setComments(res.data.result);
          // myPosts.filter(
          //     (post) => post.Post_Code !== postCode
          // )
        });
        console.log("success");
      }
      setComment_Text("");
      return a;
    } catch (err) {
      console.log(err.response.status);
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
  const commentDel = async (commentCode) => {
    try {
      const { data } = await Axios.delete(`${SERVER}/C_delete/${commentCode}`);

      getComments().then((res) => {
        setComments(res.data.result);
      });
      console.log(data, commentCode);
    } catch (err) {
      console.log(err);
    }
  };
  const commentList = comments.map((comment) => {
    return (
      <CommentBox>
        <div style={{ gridArea: "main" }}>{comment.Comment_Text}</div>
        <div style={{ gridArea: "time" }}>
          {/* {`${comment.Comment_Time.split("T")[0]} ${
            comment.Comment_Time.split("T")[1].split(".")[0]
          }`} */}
          {timeCounting(comment.Comment_Time, { lang: "ko" })}
        </div>
        {/* {`${Post_Time.split("T")[0]} ${
              Post_Time.split("T")[1].split(".")[0]
            }`} */}
        <div
          style={{ gridArea: "name", fontSize: "1.2rem", fontWeight: "700" }}
        >
          {comment.nick_name}
        </div>
        {comment.nick_name === (user && user.nick) ? (
          <CommentDel
            style={{ gridArea: "del" }}
            onClick={() => commentDel(comment.Comment_Code)}
          >
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
          placeholder="다른 사람들과 소통해보세요~"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              token ? postComments() : history.push("/login");
            }
          }}
        />
        <CommentInputSubmit
          // postComments()

          onClick={() => {
            token ? postComments() : history.push("/login");
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
