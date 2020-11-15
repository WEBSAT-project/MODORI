/*eslint-disable*/
import React, { useEffect, useState } from "react";
import Post from "../Main/Post";
import Axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import MainBody from "./MainBody";
const SetProfileDiv = styled.div`
    width: 100%;
`;

const StyledButton = styled.div`
    background-color: #f2f2f2;
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

const SetProfile = ({ history }) => {
    const [myPosts, setMyPosts] = useState([]);
    const [postId, setPostId] = useState();
    const SERVER = "http://10.80.163.169:8080";
    const token = localStorage.getItem("token");
    useEffect(() => {
        {
            getMyPosts();

            !token
                ? Swal.fire(
                      {
                          title: "로그인을 먼저 해주세요!",
                          icon: "error",
                      },
                      history.replace("/login")
                  )
                : false;
        }
    }, []);
    const getMyPosts = async () => {
        try {
            const myPost = await Axios.get(`${SERVER}/profile`, {
                headers: {
                    token: token,
                },
            });
            setMyPosts(myPost.data.result);
            console.log(myPosts.data);
        } catch (err) {
            console.log(err);
        }
    };
    const onDelete = async () => {
        // console.log(post.Post_Code);
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
                    Axios.delete(`${SERVER}/delete/${postId}`);
                } catch (err) {
                    console.log(err);
                }
                window.location.reload();
            }
        });
    };
    const myPostList = myPosts.map((post) => {
        return <Post post={post} key={post.Post_Code} onDelete={onDelete} />;
    });

    return (
        <SetProfileDiv>
            <MainHeader />
            <MainBody postList={myPostList} />
            <MainFooter />
        </SetProfileDiv>
    );
};

export default SetProfile;
