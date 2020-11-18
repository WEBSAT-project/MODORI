/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Post from "../Main/Post";
import Axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";
import Loader from "react-loader-spinner";

const SetProfileDiv = styled.div`
  width: 100%;
`;

const SetProfile = ({ history }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postId, setPostId] = useState();
  const [isLoading, setIsLoading] = useState();
  const SERVER = "http://10.80.163.169:8080";
  const token = localStorage.getItem("token");
  const LoadingDiv = styled.div`
    padding:20vh 3rem 3rem;;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;
  useEffect(() => {
    {
      getMyPosts();
      !token
        ? Swal.fire(
            {
              title: "로그인을 먼저 해주세요!",
              icon: "error",
            },
            history.replace("/login"),
          )
        : false;
    }
  }, []);
  const getMyPosts = async () => {
    try {
      setIsLoading(true);
      const myPost = await Axios.get(`${SERVER}/profile`, {
        headers: {
          token: token,
        },
      });
      setMyPosts(myPost.data.result);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const onDelete = (postCode) => {
    Swal.fire({
      title: "확실합니까?",
      text: "다시 복구할 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 삭제할께요!",
      cancelButtonText: "좀 더 생각해볼게요",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await Axios.delete(`${SERVER}/delete/${postCode}`);
          if (data.message === "삭제 되었습니다") {
            setMyPosts(myPosts.filter((post) => post.Post_Code !== postCode));
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const myPostList = myPosts.map((post, index) => {
    return (
      <Post
        post={post}
        onDelete={onDelete}
        key={index}
        isOwner={true}
        ableDel={true}
      />
    );
  });

  return (
    <>
      <SetProfileDiv>
        <MainHeader />
        {isLoading ? (
          <LoadingDiv>
            <Loader type="Grid" color="#5ebf9b" />
            <h3>로딩중...</h3>
          </LoadingDiv>
        ) : (
          <>
            {myPostList.length === 0 ? (
              <LoadingDiv>나만의 글을 작성해보세요!</LoadingDiv>
            ) : (
              <MainBody postList={myPostList}></MainBody>
            )}
          </>
        )}
        {/* {isLoading ? (
          <LoadingDiv>
            <Loader type="Grid" color="#5ebf9b" />
            <h3>로딩중...</h3>
          </LoadingDiv>
        ) : (
            {}
          <MainBody postList={myPostList} />
        )} */}
      </SetProfileDiv>
    </>
  );
};

export default SetProfile;
