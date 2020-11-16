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
        } catch (err) {
            console.log(err);
        }
    };

    const myPostList = myPosts.map((post, index) => {
        return <Post post={post} key={index} isOwner={true} />;
    });

    return (
        <>
            <SetProfileDiv>
                <MainHeader />
                <MainBody postList={myPostList} />
            </SetProfileDiv>
        </>
    );
};

export default SetProfile;
