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
        width: 100%;
        height: 80vh;
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
                      history.replace("/login")
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

    const myPostList = myPosts.map((post, index) => {
        return <Post post={post} key={index} isOwner={true} />;
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
                    <MainBody postList={myPostList} />
                )}
            </SetProfileDiv>
        </>
    );
};

export default SetProfile;
